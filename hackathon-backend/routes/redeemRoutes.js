import express from 'express';
import { redeemItem } from '../controllers/redeemController.js';
import { protect } from '../middlewares/authMiddleware.js';
import PointRedemption from '../models/PointRedemption.js';

const redeemRouter = express.Router();

redeemRouter.post('/', protect, redeemItem);
redeemRouter.get('/user/my-redeems', protect, async (req, res) => {
  try {
    const redemptions = await PointRedemption.find({ user: req.user._id })
      .populate('item')
      .sort({ createdAt: -1 });

    res.json(redemptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default redeemRouter;