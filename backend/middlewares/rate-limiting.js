import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 20, // limit each IP to 20 messages per second
  message: {
    success: false,
    error: "Too many requests, slow down!"
  }
});