import express from "express";
import http from "http";
import cors from "cors";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import connectDB from "./prisma/db.js";

import { ApolloServer } from "apollo-server-express";
import { useServer } from "graphql-ws/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";

const app = express();
app.use(cors());
connectDB();

// 1. Create GraphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// 2. Create ApolloServer instance with schema
const server = new ApolloServer({
  schema,
});

// 3. Start ApolloServer
await server.start(app);
server.applyMiddleware({ app });

// 4. Create HTTP server from Express
const httpServer = http.createServer(app);

// 5. Create WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// 6. Bind GraphQL schema to WebSocket server
useServer({ schema }, wsServer);

// 7. Start the HTTP+WebSocket Server
httpServer.listen(3000, () => {
  console.log("🚀 Server ready at http://localhost:3000/graphql");
});
