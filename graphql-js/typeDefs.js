import { gql } from "apollo-server-express";

// Define GraphQL Schema
const typeDefs = gql`
  type User {
    id: String!
    name: String!
    username: String!
    email: String!
  }

  type Comment {
    id: String!
    fromUser: String
    comment: String
    postId: String
    createdAt: String
  }

  type Notification {
    id: String
    fromUser: String
    toUser: String
    type: String
    isRead: Boolean
    postId: String
    notifyAt: String
  }

  type BlogPost {
    id: String
    title: String
    body: String
    userId: User
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
    hello: String
  }

  type Mutation {
    addBlogPost(userId: String, title: String, body: String): BlogPost
    createUser(name: String!, email: String!, username: String!): User
    startChat(targetUserId: String!, userId: String!): ChatRoom!
    sendMessage(chatRoomId: String!,senderId: String!, content: String!): Message!
    activateNotification(toUser: String!): Notification!
    newComment(fromUser: String!, comment: String!, postId: String!): Comment
  }

  type Subscription {
    newBlogPost: BlogPost
    onMessage(chatRoomId: String!): Message!
    activeNotify(userId: String!): Notification!
  }
`;

export default typeDefs;
