// controllers/swapController.js
import SwapRequest from '../models/SwapRequest.js';
import Item from '../models/Item.js';

/**
 * @desc Request to swap an item
 * @route POST /api/v1/swaps
 * @access Private
 */
export const requestSwap = async (req, res) => {
  const { itemId } = req.body;

  try {
    const item = await Item.findById(itemId);
    if (!item || item.status !== 'available') {
      return res.status(400).json({ message: 'Item not available for swap' });
    }

    if (String(item.uploadedBy) === String(req.user._id)) {
      return res.status(400).json({ message: 'You cannot swap your own item' });
    }

    const existingSwap = await SwapRequest.findOne({
      item: itemId,
      requester: req.user._id,
      status: 'pending'
    });

    if (existingSwap) {
      return res.status(400).json({ message: 'You already requested a swap for this item' });
    }

    const swap = await SwapRequest.create({
      item: itemId,
      requester: req.user._id
    });

    res.status(201).json({ message: 'Swap requested', swap });
  } catch (err) {
    res.status(500).json({ message: 'Swap request failed', error: err.message });
  }
};

/**
 * @desc Accept or reject a swap request
 * @route PATCH /api/v1/swaps/:id/status
 * @access Private
 */
export const updateSwapStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const swap = await SwapRequest.findById(id).populate('item');
    if (!swap) return res.status(404).json({ message: 'Swap request not found' });

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    if (String(swap.item.uploadedBy) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only item owner or admin can respond to this swap request' });
    }

    swap.status = status;

    if (status === 'accepted') {
      swap.item.status = 'swapped';
      await swap.item.save();
    }

    await swap.save();
    res.json({ message: `Swap ${status}`, swap });
  } catch (err) {
    res.status(500).json({ message: 'Swap status update failed', error: err.message });
  }
};
