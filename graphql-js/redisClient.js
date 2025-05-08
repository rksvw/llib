// backend/src/config/redisClient.js
import Redis from "ioredis";

const redis = new Redis(); // Defaults to localhost:6379

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.log("Redis error: ", err);
});


export default redis;
