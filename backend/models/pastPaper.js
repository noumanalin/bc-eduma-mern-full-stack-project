import mongoose from 'mongoose';

const pastPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String }, // e.g., "2023"
  subject: { type: String },
  price: { type: Number, default: 0 },
  fileUrl: { type: String, required: true }, // Cloudinary PDF or file link
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin
  tags: [String],
}, { timestamps: true });

export const PastPaper = mongoose.model('PastPaper', pastPaperSchema);
