// controllers/redeemController.js
import PointRedemption from '../models/PointRedemption.js';
import Item from '../models/Item.js';
import User from '../models/User.js';

/**
 * @desc Redeem an available item using points
 * @route POST /api/redeem
 * @access Private
 */
export const redeemItem = async (req, res) => {
  const { itemId, pointsUsed } = req.body;

  try {
    const item = await Item.findById(itemId);
    const user = await User.findById(req.user._id);

    if (!item || item.status !== 'available') {
      return res.status(400).json({ message: 'Item not available for redemption' });
    }

    if (String(item.uploadedBy) === String(req.user._id)) {
      return res.status(400).json({ message: 'You cannot redeem your own item' });
    }

    if (user.points < pointsUsed) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    user.points -= pointsUsed;
    item.status = 'swapped';

    await user.save();
    await item.save();

    const redemption = await PointRedemption.create({
      item: itemId,
      user: user._id,
      pointsUsed
    });

    res.status(201).json({ message: 'Item redeemed successfully', redemption });
  } catch (err) {
    res.status(500).json({ message: 'Redemption failed', error: err.message });
  }
};
