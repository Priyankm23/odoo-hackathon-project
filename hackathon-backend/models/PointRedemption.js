import mongoose from 'mongoose';

const pointRedemptionSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pointsUsed: Number
}, { timestamps: true });

export default mongoose.model('PointRedemption', pointRedemptionSchema);
