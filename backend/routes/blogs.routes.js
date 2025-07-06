import { Router } from "express";
import { createBlog, deleteBlog, getBlogs, getSingleBlog } from '../controller/blog.controller.js'
import { createBlogValidations } from "../middlewares/express-validator.js";
import upload from "../middlewares/multer.js";
const router = Router();



// * GET Blog Pagination API Route /api/blogs?page=2&limit=10
router.get('/blogs', getBlogs);
router.get('/blog/:id', getSingleBlog);


// * Admin Protected Routes
router.post(
    '/blog/create',
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 }
    ]),
    createBlogValidations,
    createBlog
);// TODO: add middlewares isLogedIn, isAdmin

router.delete('/blogs/:id', deleteBlog);
// router.put('/blogs/:id', updateBlog);    

export default router;