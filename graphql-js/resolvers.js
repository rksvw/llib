import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pubsub = new PubSub();

const resolvers = {
  Query: {
    async blogPosts(parent, args, context, info) {
      const blgPosts = await prisma.blogPost.findMany();

      const countPosts = await prisma.blogPost.count();

      return {
        nodes: blgPosts,
        aggregate: {
          count,
        },
      };
    },
    async blogPost(parent, args, context, info) {
      const id = args.id;
      const blgPosts = await prisma.blogPost.findUnique({
        where: {
          id,
        },
      });

      return {
        blgPosts,
      };
    },
  },
  Mutation: {
    async createUser(parent, args, context, info) {
      const { name, email, username } = args;
      const newUser = await prisma.user.create({
        data: {
          name,
          username,
          email,
        },
      });

      return {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      };
    },
    async addBlogPost(parent, args, context, info) {
      const { title, body } = args;
      const newBlogPost = await prisma.blogPost.create({
        data: {
          title,
          body,
        },
      });

      pubsub.publish("NEW_BLOGPOST", { newBlogPost });

      return {
        id: newBlogPost.id,
        title: newBlogPost.title,
        body: newBlogPost.body,
      };
    },
    async startChat(parent, args, context, info) {
      const targetUserId = args.targetUserId;
      const userId = args.userId;

      const existingRoom = await prisma.chatRoom.findFirst({
        where: {
          isGroup: false,
          participants: {
            some: {
              userId,
            },
          },
          AND: {
            participants: {
              some: {
                userId: targetUserId,
              },
            },
          },
        },
        include: {
          participants: true,
        },
      });

      if (existingRoom) {
        return existingRoom;
      }

      const newRoom = await prisma.chatRoom.create({
        data: {
          isGroup: false,
          participants: {
            create: [
              { user: { connect: { id: userId } } },
              { user: { connect: { id: targetUserId } } },
            ],
          },
        },
        include: {
          participants: true,
        },
      });

      console.log(newRoom);

      return {
        id: newRoom.id,
        isGroup: newRoom.isGroup,
      };
    },
    async sendMessage(parent, args, context, info) {
      console.log(args)
      const message = await prisma.message.create({
        data: {
          content: args.content,
          chatRoom: { connect: { id: args.chatRoomId } },
          sender: { connect: { id: args.senderId } },
        },
        include: {
          sender: true,
          chatRoom: true,
        },
      });

      await pubsub.publish(`CHAT_${args.chatRoomId}`, {
        onMessage: message,
      });
      return message;
    },
  },
  Subscription: {
    newBlogPost: {
      resolve: (payload) => payload.newBlogPost,
      subscribe: () => pubsub.asyncIterableIterator("NEW_BLOGPOST"),
    },
    onMessage: {
      subscribe: (_, { chatRoomId }) => {
        return pubsub.asyncIterableIterator(`CHAT_${chatRoomId}`);
      },
    },
  },
};

export default resolvers;
