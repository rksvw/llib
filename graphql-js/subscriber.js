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

export const subscribeToNotify = (notificationId, callback) => {
  subscriber.subscribe(`notify:${notificationId}`);


  subscriber.on("message", (channel, message) => {
    if (channel === `notify:${notificationId}`) {
      const data = JSON.parse(message);
      console.log("New notification for abc123:", data);
      callback(data);
    }
  });
};
