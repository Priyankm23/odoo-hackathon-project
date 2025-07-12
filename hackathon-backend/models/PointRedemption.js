import mongoose from 'mongoose';

const pointRedemptionSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pointsUsed: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('PointRedemption', pointRedemptionSchema);