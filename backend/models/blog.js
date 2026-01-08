import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 25
  },
  category: {
    type: String,
    default: "blog",
    trim: true
  },
  date: {
    type: Number,
    default: () => Date.now()
  },
  images: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, 'At least one image is required.']
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: String
  }
});

export const Blog = mongoose.model('Blog', blogSchema);
