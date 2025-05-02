import redis from "./redisClient";

export const publishMessage = async (chatRoomId, message) => {
  const payload = JSON.stringify(message);
  await redis.publish(`chat:${chatRoomId}`, payload);
};
