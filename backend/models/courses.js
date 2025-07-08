import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  thumbnail: { type: String }, // Cloudinary image URL
  price: { type: Number, required: true },
  isFree: { type: Boolean, default: false }, 

  content: { type: String }, //  Optional: could be text editor, HTML, or markdown

  totalLessons: { type: Number, default: 0 }, 
  duration: { type: String }, // e.g., "6 weeks", "10 hours"
  language: { type: String, default: "English" },

  level: {
    type: String,
    enum: ["beginner", "intermediate", "expert"],
    default: "beginner"
  },

  category: { type: String }, // e.g., "Programming", "Design"
  tags: [String], // e.g., ["FSc", "Part 1"]
  certificate: {
    type: Boolean,
    default: false //  Offer certificate after completion
  },

  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  numberOfStudents: { type: Number, default: 0 }, // ✅ Auto-update on enrollment

  rating: {
    average: { type: Number, default: 0 }, // ✅ Avg. rating
    count: { type: Number, default: 0 }     // ✅ Total reviews
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  published: { type: Boolean, default: true },

}, { timestamps: true });

export const Course = mongoose.model('Course', courseSchema);
