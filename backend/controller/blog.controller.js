import { validationResult } from "express-validator";
import mongoose from 'mongoose';
import { Blog } from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";

// * Create New Blog -----------------------------------------------------------------------------------------------------------
export const createBlog = async (req, res) => {
  console.log("REQ.BODY:", req.body);
  console.log("REQ.FILES:", req.files);
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return res.status(400).json({
      success: false,
      errArray: errorMessages,
      message: "🙏 Kindly fulfill all requirements."
    });
  }

  try {
    const { title, category, body, tags } = req.body;

    // Extract uploaded image buffers from Multer
    const imageFiles = [
      req.files.image1?.[0],
      req.files.image2?.[0],
      req.files.image3?.[0]
    ].filter(Boolean);

    // Ensure at least one image is provided
    if (imageFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "❌ At least one image is required."
      });
    }

    // Upload each image buffer to Cloudinary
    const cloudinaryImages = [];
    for (const file of imageFiles) {
      const uploaded = await cloudinary.uploader.upload_stream({ folder: "blogs" }, async (error, result) => {
        if (error) throw new Error(error.message);
        return result;
      });

      // Wait for stream to finish
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder: "blogs" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
          stream.end(file.buffer);
        });

      const result = await streamUpload();
      cloudinaryImages.push(result.secure_url);
    }

    // Create blog document
    const newBlog = new Blog({
      title,
      category,
      body,
      tags,
      // tags: Array.isArray(tags) ? tags : [tags],
      images: cloudinaryImages
    });

    const savedBlog = await newBlog.save();

    return res.status(201).json({
      success: true,
      message: "🎉 Blog created successfully!",
      blog: savedBlog
    });

  } catch (error) {
    console.log(`❌ Create Blog Server Error:: ${error.message || error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message || error
    });
  }
};



// * Get Blogs Pagination API ------------------------------------------------------------------------------------------------------
// /api/blogs?page=2&limit=5
export const getBlogs = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    // Get total blog count
    let totalRecords = await Blog.countDocuments();

    // Calculate total pages
    let totalPages = Math.ceil(totalRecords / limit);

    // Get paginated blogs
    const blogs = await Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      totalRecords,
      totalPages,
      currentPage: page,
      limit,
      blogs
    });

  } catch (error) {
    console.log(`❌ Get Blogs Server Error:: ${error.message || error}`);
    return res.status(500).json({success:false, message:"internal server error", error:error.message || error})
  }
}

// * Get Single Blog  --------------------------------------------------------------------------------------------------------------------
export const getSingleBlog = async (req, res)=>{
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID" });
    }

    const blog = await Blog.findById(id).maxTimeMS(20000);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    return res.status(200).json({ success: true, blog });
  } catch (error) {
    console.log(`❌ Get Single Blog Server Error:: ${error.message || error}`);
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(504).json({ success: false,  message: "Database operation timed out", suggestion: "Please try again later" });
    }
    return res.status(500).json({success:false, message:"internal server error", error:error.message || error})
  }
}


//  * Delete Blog Admin Proctected -----------------------------------------------------------------------------------------------------------------------------
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, message: "Your Blog deleted Successfully." });
  } catch (error) {
    console.log(`❌ deleteBlog Server Error:: ${error.message || error}`);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message || error });
  }
};
