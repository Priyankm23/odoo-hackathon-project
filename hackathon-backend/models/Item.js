import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String], // Cloudinary URLs
  category: String,
  type: String,
  size: String,
  condition: String,
  tags: [String],
  status: { type: String, enum: ['pending', 'available', 'swapped'], default: 'pending' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
