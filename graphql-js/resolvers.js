import pubsub from "./subscription/pubsub.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    async hello() {
      "Hello World!";
    },
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
      const { title, body, userId } = args;
      const newBlogPost = await prisma.blogPost.create({
        data: {
          title,
          body,
          userId,
        },
      });

      pubsub.publish("NEW_BLOGPOST", { newBlogPost });

      return {
        id: newBlogPost.id,
        title: newBlogPost.title,
        body: newBlogPost.body,
      };
    },
    async newComment(parent, args, context, info) {
      const { fromUser, comment, postId } = args;

      const createComment = await prisma.comment.create({
        data: { fromUser, comment, postId },
      });

      const findUserFromPost = await prisma.blogPost.findUnique({
        where: { id: createComment.postId },
        select: { userId: true },
      });

      const createNotification = await prisma.notification.create({
        data: {
          fromUser: createComment.fromUser,
          toUser: findUserFromPost.userId,
          type: "COMMENT_ON_POST",
          isRead: false,
          postId: postId,
        },
      });

      pubsub.publish(`notify:${createNotification.toUser}`, {
        activeNotify: createNotification,
      });

      return {
        id: createComment.id,
        fromUser,
        comment,
        createdAt: createComment.createdAt,
        postId,
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
      console.log(args);
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

    async addTodo(parent, args, context, info) {
      const {todo, isPriority, timer} = args;

      const storeTodo = await prisma.todos.create({
        data: {todo, isPriority, timer}
      });

      console.log(storeTodo);

      return storeTodo;
    }
  },
  Subscription: {
    newBlogPost: {
      resolve: (payload) => payload.newBlogPost,
      subscribe: () => pubsub.asyncIterableIterator("NEW_BLOGPOST"),
    },
    onMessage: {
      subscribe: (_, { chatRoomId }) => {
        return pubsub.asyncIterator(`CHAT_${chatRoomId}`);
      },
    },
    activeNotify: {
      subscribe: (_, { userId }) => {
        return pubsub.asyncIterator(`notify:${userId}`);
      },
      resolve: (payload) => {
        // Make sure payload is not null and has required fields
        if (!payload || !payload.activeNotify || !payload.activeNotify.id) {
          throw new Error("Invalid payload for activeNotify subscription");
        }
        return payload.activeNotify;
      },
    },
  },
};

export default resolvers;
