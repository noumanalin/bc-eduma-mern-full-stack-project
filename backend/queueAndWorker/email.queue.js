import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const redis_url = process.env.REDIS_URL || "redis://localhost:6379";
const redisConnection = new IORedis(redis_url, {
  maxRetriesPerRequest: null,  
  enableReadyCheck: false      // Optional but recommended
});

const otpQueue = new Queue('send-otp-email-queue', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  }
});

export const sendOtpEmailQueue = otpQueue;