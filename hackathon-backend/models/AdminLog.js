import mongoose from 'mongoose';

const adminLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  details: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('AdminLog', adminLogSchema);