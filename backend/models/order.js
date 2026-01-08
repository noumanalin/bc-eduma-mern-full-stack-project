import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  pastPapers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PastPaper' }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentId: { type: String }, // e.g., Stripe,
  paymentMethod: { type: String }, // "stripe", "paypal"
  paidAt: { type: Date },
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
