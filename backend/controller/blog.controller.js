import { validationResult } from "express-validator";
import mongoose from 'mongoose';
import { Blog } from "../models/blog.js";
import cloudinary from "../utils/cloudinary.js";
import { getBuffer } from "../utils/getBuffer.js";

// 1. Create Blog -----------------------------------------------------------------------------------------------------------
export const createBlog = async (req, res) => {
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

    const imageFiles = [
      req.files.image1?.[0],
      req.files.image2?.[0],
      req.files.image3?.[0]
    ].filter(Boolean);

    if (imageFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "❌ At least one image is required."
      });
    }

    const cloudinaryImages = [];

    for (const file of imageFiles) {
      const buffer = getBuffer(file);
      if (!buffer?.content) {
        return res.status(400).json({
          success: false,
          message: "❌ Failed to generate file buffer"
        });
      }

      const cloud = await cloudinary.uploader.upload(buffer.content, { folder: "blogs" });
      cloudinaryImages.push(cloud.secure_url);
    }

    const newBlog = new Blog({
      title,
      category,
      body,
      tags,
      images: cloudinaryImages,
      author: req.id 
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

// 2. Get Blogs with Pagination ---------------------------------------------------------------------------------------------
export const getBlogs = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    const totalRecords = await Blog.countDocuments();
    const totalPages = Math.ceil(totalRecords / limit);

    const blogs = await Blog.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

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
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message || error
    });
  }
};

// 3. Get Single Blog -------------------------------------------------------------------------------------------------------
export const getSingleBlog = async (req, res) => {
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
      return res.status(504).json({
        success: false,
        message: "Database operation timed out",
        suggestion: "Please try again later"
      });
    }
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message || error });
  }
};

// 4. Delete Blog ------------------------------------------------------------------------------------------------------------
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

    // Remove each image from Cloudinary
    const deletePromises = blog.images.map(async (imageUrl) => {
      const urlParts = imageUrl.split('/');
      const publicId = urlParts[urlParts.length - 1].split('.')[0];
      return await cloudinary.uploader.destroy(`blogs/${publicId}`);
    });

    await Promise.all(deletePromises);

    res.status(200).json({ success: true, message: "✅ Your Blog and its images were deleted successfully." });
  } catch (error) {
    console.log(`❌ deleteBlog Server Error:: ${error.message || error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message || error
    });
  }
};
