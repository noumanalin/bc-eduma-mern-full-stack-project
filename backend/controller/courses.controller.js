import { Course } from "../models/courses.js";
import { User } from "../models/user.js";
import { Order } from "../models/order.js";
import cloudinary from "../utils/cloudinary.js";
import { getBuffer } from "../utils/getBuffer.js";
import { redisCache } from "../utils/expressRedisCache.js";

// 0. ----------------------------------------------------------------------------------------------------------------------
export const testAdmin = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        const admin = req.admin;
        res.status(200).json({ success: true, isAdmin, admin });
    } catch (error) {
        console.log(`❌ testAdmin server error ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error", error: error.message });
    }
};

// 1. ----------------------------------------------------------------------------------------------------------------------
export const createCourse = async (req, res) => {
    try {
        const createdBy = req.admin._id;

        const { title, description, price, isFree, content, totalLessons, duration, language, level, category, tags, certificate, published } = req.body;

        if (
        !title || !description || price === undefined || isFree === undefined || !content || !totalLessons || !duration ||
        !language || !level || !category || !tags || certificate === undefined || published === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                emptyFieldsAre: `${!title ? "title," :
                    !description ? "description," :
                    price === undefined ? "price," :
                    isFree === undefined ? "isFree," :
                    !content ? "content," :
                    !totalLessons ? "totalLessons," :
                    !duration ? "duration," :
                    !language ? "language," :
                    !level ? "level," :
                    !category ? "category," :
                    !tags ? "tags," :
                    certificate === undefined ? "certificate," :
                    published === undefined ? "published" : ""
                }`
            });
        }


        let thumbnail = "";
        if (req.file) {
            const buffer = getBuffer(req.file);
            const upload = await cloudinary.uploader.upload(buffer.content, {
                folder: "courses",
            });
            thumbnail = upload.secure_url;
        }

        const course = await Course.create({
            title,
            description,
            thumbnail,
            price,
            isFree,
            content,
            totalLessons,
            duration,
            language,
            level,
            category,
            tags,
            certificate,
            createdBy,
            published,
        });

        if (process.env.ENVIRONMENT === 'development' || process.env.ENVIRONMENT !== 'production') {
            redisCache.del('/api/course/getAll', () => console.log(`⏰ Redis cache cleared: getAll`));
            redisCache.del('/api/course/stats', () => console.log(`⏰ Redis cache cleared: stats`));
        } else {
            redisCache.del('/api/course/getAll');
            redisCache.del('/api/course/stats');
        }
    

        res.status(201).json({ success: true, message: "Course created successfully", course });
    } catch (error) {
        console.log(`❌ createCourse server error ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error", error: error.message });
    }
};

// 2. ----------------------------------------------------------------------------------------------------------------------
export const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const createdBy = req.admin._id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        if (course.createdBy.toString() !== createdBy.toString()) {
            return res.status(403).json({ success: false, message: "You are not allowed to update this course" });
        }

        const updateFields = req.body;

        if (req.file) {
            // Delete old image
            const publicId = course.thumbnail?.split("/").pop().split(".")[0];
            if (publicId) {
                await cloudinary.uploader.destroy(`courses/${publicId}`);
            }

            // Upload new image
            const buffer = getBuffer(req.file);
            const upload = await cloudinary.uploader.upload(buffer.content, { folder: "courses" });
            updateFields.thumbnail = upload.secure_url;
        }

        const updatedCourse = await Course.findByIdAndUpdate(courseId, updateFields, { new: true });

        if(process.env.ENVIRONMENT=="development" || process.env.ENVIRONMENT!="production"){
            redisCache.del('/api/course/getAll', ()=>console.log(`⏰ Redis Route level Cache deleted:getAll`));
            redisCache.del('/api/course/stats', ()=>console.log(`⏰ Redis Route level Cache deleted:Admin Dashboard stats `));
        }else{
            redisCache.del('/api/course/getAll');
            redisCache.del('/api/course/stats'); 
        }

        res.status(200).json({ success: true, message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        console.log(`❌ updateCourse server error ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error", error: error.message });
    }
};

// 3. ----------------------------------------------------------------------------------------------------------------------
export const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const createdBy = req.admin._id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        if (course.createdBy.toString() !== createdBy.toString()) {
            return res.status(403).json({ success: false, message: "You are not allowed to delete this course" });
        }

        // Delete thumbnail from Cloudinary
        const publicId = course.thumbnail?.split("/").pop().split(".")[0];
        if (publicId) {
            await cloudinary.uploader.destroy(`courses/${publicId}`);
        }

        await course.deleteOne();

        if(process.env.ENVIRONMENT=="development" || process.env.ENVIRONMENT!="production"){
            redisCache.del(`/api/course/getSingle/${courseId}`, ()=>console.log("⏰ Redis Route level Cache deleted because"))
            redisCache.del('/api/course/getAll', ()=>console.log(`⏰ Redis Route level Cache deleted:getAll`));
        } else {
            redisCache.del(`/api/course/getSingle/${courseId}`)
            redisCache.del('/api/course/getAll');

        } 
        
        res.status(200).json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
        console.log(`❌ deleteCourse server error ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error", error: error.message });
    }
};

// 4. ----------------------------------------------------------------------------------------------------------------------
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("createdBy", "name email role");

        res.status(200).json({ success: true, total: courses.length, courses });
    } catch (error) {
        console.log(`❌ getAllCourses server error ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error", error: error.message });
    }
};

// 5. ----------------------------------------------------------------------------------------------------------------------
export const getSingleCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findById(courseId).populate("createdBy", "name email role");

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({ success: true, course });
    } catch (error) {
        console.log(`❌ getSingleCourse server error ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error", error: error.message });
    }
};


// 6. ----------------------------------------------------------------------------------------------------------------------
export const enrollCourse = async (req, res) => {
    try {
        const userId = req.id;
        const courseId = req.params.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        if (course.enrolledUsers.includes(userId)) {
            return res.status(400).json({ success: false, message: "You are already enrolled in this course." });
        }

        course.enrolledUsers.push(userId);
        course.numberOfStudents += 1;
        await course.save();

        res.status(200).json({ success: true, message: "Enrolled successfully in course", course });
    } catch (error) {
        console.log(`❌ enrollCourse server error ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error", error: error.message });
    }
};


// 7. ----------------------------------------------------------------------------------------------------------------------
export const getCourseStats = async (req, res) => {
    try {
        const totalCourses = await Course.countDocuments();
        const totalEnrollments = await Course.aggregate([
            { $group: { _id: null, total: { $sum: "$numberOfStudents" } } }
        ]);

        const totalRevenueResult = await Order.aggregate([
            { $match: { status: "paid" } },
            { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalCourses,
                totalEnrollments: totalEnrollments[0]?.total || 0,
                totalRevenue: totalRevenueResult[0]?.totalRevenue || 0
            }
        });
    } catch (error) {
        console.log(`❌ getCourseStats server error ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error", error: error.message });
    }
};