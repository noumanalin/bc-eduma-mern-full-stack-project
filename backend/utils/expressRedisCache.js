import cache from 'express-redis-cache';
import dotenv from 'dotenv';
dotenv.config();

const redisCache = cache({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  expire: 60 // Cache expires after 60 seconds
});

export default redisCache;


// who to use
// import redisCache from '../cache/redisCache.js';
// router.get('/blogs', redisCache.route(), getAllBlogs);
// i have to use this in createBlog api controller 
// redisCache.del('/api/blogs', () => {
//       console.log('Cache for /api/blogs cleared');
//     });