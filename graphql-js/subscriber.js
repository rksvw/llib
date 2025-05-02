import Redis from "ioredis";

const subscriber = new Redis();

export const subscribeToChat = (chatRoomId, callback) => {
  subscriber.subscribe(`chat:${chatRoomId}`);

  subscriber.on("message", (channel, message) => {
    if (channel === `chat:${chatRoomId}`) {
      const data = JSON.parse(message);
      callback(data);
    }
  });
};
