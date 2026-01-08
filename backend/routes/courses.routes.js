import { Router } from 'express'
import { isLogedin } from '../middlewares/isLogedIn.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { createCourse, deleteCourse, enrollCourse, getAllCourses, getCourseStats, getSingleCourse, testAdmin, updateCourse } from '../controller/courses.controller.js';
import upload from '../middlewares/multer.js';
import { redisCache } from '../utils/expressRedisCache.js';

const router = Router();


router.get('/test/admin', isLogedin, isAdmin, testAdmin)

// 🔐 Admin Routes 
router.post('/create', isLogedin, isAdmin, upload.single('image'), createCourse);
router.put('/update/:id', isLogedin, isAdmin, upload.single('image'), updateCourse);
router.delete('/delete/:id', isLogedin, isAdmin, deleteCourse);
router.get('/stats', isLogedin, isAdmin, redisCache.route(), getCourseStats); // Admin dashboard

// 🎓 Student/User Route
router.post('/enroll/:id', isLogedin, enrollCourse);

// 🌍 Public Routes
router.get('/getAll', redisCache.route(), getAllCourses);
router.get('/getSingle/:id', redisCache.route(), getSingleCourse);


export default router;


// http://localhost:3000/api/course