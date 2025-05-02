import { gql } from "apollo-server-express";

// Define GraphQL Schema
const typeDefs = gql`
  type User {
    id: String!
    name: String!
    username: String!
    email: String!
  }

  type BlogPost {
    id: String
    title: String
    body: String
  }

  type Message {
    id: String!
    content: String!
    sender: User!
    chatRoom: ChatRoom!
  }

  type ChatRoom {
    id: String!
    isGroup: Boolean!
    participants: [Participant!]!
    messages: [Message!]!
  }

  type Participant {
    id: String!
    user: User!
    chatRoom: ChatRoom!
  }

  type Aggregate {
    count: String
  }

  type BlogPosts {
    nodes: [BlogPost]
    aggregate: Aggregate
  }

  type Query {
    users: [User]
    user(id: ID!): User
    blogPosts: BlogPosts
    blogPost(id: String): BlogPost
  }

  type Mutation {
    addBlogPost(title: String, body: String): BlogPost
    createUser(name: String!, email: String!, username: String!): User
    startChat(targetUserId: String!, userId: String!): ChatRoom!
    sendMessage(chatRoomId: String!,senderId: String!, content: String!): Message!
  }

  type Subscription {
    newBlogPost: BlogPost
    onMessage(chatRoomId: String!): Message!
  }
`;

export default typeDefs;
