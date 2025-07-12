import express from 'express';
import PointRedemption from '../models/PointRedemption.js';
import Item from '../models/Item.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST /api/v1/redeem
router.post('/', protect, async (req, res) => {
  try {
    const { itemId } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.status !== 'available') {
      return res.status(400).json({ message: 'Item not available for redemption' });
    }

    const pointsRequired = item.pointValue || 75;

    if (req.user.points < pointsRequired) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    const redemption = await PointRedemption.create({
      item: itemId,
      user: req.user._id,
      pointsUsed: pointsRequired
    });

    await User.findByIdAndUpdate(req.user._id, { $inc: { points: -pointsRequired } });
    await Item.findByIdAndUpdate(itemId, { status: 'swapped' });

    await redemption.populate('item');
    res.status(201).json(redemption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/v1/redeem/user/my-redeems
router.get('/user/my-redeems', protect, async (req, res) => {
  try {
    const redemptions = await PointRedemption.find({ user: req.user._id })
      .populate('item')
      .sort({ createdAt: -1 });

    res.json(redemptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;