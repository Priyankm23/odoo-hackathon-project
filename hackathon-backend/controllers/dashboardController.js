import User from '../models/User.js';
import Item from '../models/Item.js';
import SwapRequest from '../models/SwapRequest.js';
import PointRedemption from '../models/PointRedemption.js';

/**
 * @desc Get user dashboard data (profile + uploads + purchases)
 * @route GET /api/v1/dashboard
 * @access Private
 */
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // User Info (excluding password)
    const user = await User.findById(userId).select('-password');

    // Items uploaded by user
    const listedItems = await Item.find({ uploadedBy: userId });

    // Items user has acquired (swapped or redeemed)
    const swapped = await SwapRequest.find({ requester: userId, status: 'accepted' })
      .populate('item');

    const redeemed = await PointRedemption.find({ user: userId })
      .populate('item');

    const purchasedItems = [
      ...swapped.map(req => req.item),
      ...redeemed.map(entry => entry.item),
    ];

    res.json({
      user,
      listedItems,
      purchasedItems
    });
  } catch (err) {
    res.status(500).json({ message: 'Dashboard data fetch failed', error: err.message });
  }
};
