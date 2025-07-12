import express from 'express';
import Item from '../models/Item.js';
import AdminLog from '../models/AdminLog.js';
import SwapRequest from '../models/SwapRequest.js';
import PointRedemption from '../models/PointRedemption.js';
import User from '../models/User.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/v1/admin/items/pending
router.get('/items/pending', protect, admin, async (req, res) => {
  try {
    const items = await Item.find({ status: 'pending' })
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/v1/admin/items/:id/approve
router.patch('/items/:id/approve', protect, admin, async (req, res) => {
  try {
    const { pointValue = 75 } = req.body;
    
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status: 'available', pointValue },
      { new: true }
    ).populate('uploadedBy');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Award points to uploader
    await User.findByIdAndUpdate(item.uploadedBy._id, { $inc: { points: 25 } });

    // Log admin action
    await AdminLog.create({
      adminId: req.user._id,
      action: 'approve',
      itemId: item._id,
      details: `Approved item: ${item.title}`
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/v1/admin/items/:id
router.delete('/items/:id', protect, admin, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await Item.findByIdAndDelete(req.params.id);

    // Log admin action
    await AdminLog.create({
      adminId: req.user._id,
      action: 'reject',
      itemId: item._id,
      details: `Rejected item: ${item.title}`
    });

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/v1/admin/logs
router.get('/logs', protect, admin, async (req, res) => {
  try {
    const logs = await AdminLog.find()
      .populate('adminId', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/v1/admin/dashboard
router.get('/dashboard', protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalItems = await Item.countDocuments();
    const pendingItems = await Item.countDocuments({ status: 'pending' });
    const availableItems = await Item.countDocuments({ status: 'available' });
    const swappedItems = await Item.countDocuments({ status: 'swapped' });
    const totalSwaps = await SwapRequest.countDocuments();
    const totalRedemptions = await PointRedemption.countDocuments();

    res.json({
      totalUsers,
      totalItems,
      pendingItems,
      availableItems,
      swappedItems,
      totalSwaps,
      totalRedemptions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;