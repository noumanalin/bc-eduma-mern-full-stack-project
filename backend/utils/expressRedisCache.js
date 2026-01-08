import cache from 'express-redis-cache';
import dotenv from 'dotenv';
dotenv.config();

export const redisCache = cache({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  expire: 10 * 60  
});
 


// who to use
// import redisCache from '../cache/redisCache.js';
// router.get('/blogs', redisCache.route(), getAllBlogs);
// i have to use this in createBlog api controller 
// redisCache.del('/api/blogs', () => {
//       console.log('Cache for /api/blogs cleared');
//     });