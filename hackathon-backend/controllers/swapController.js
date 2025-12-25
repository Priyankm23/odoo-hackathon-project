// controllers/swapController.js
import SwapRequest from '../models/SwapRequest.js';
import Item from '../models/Item.js';

/**
 * @desc Request to swap an item
 * @route POST /api/v1/swaps
 * @access Private
 */
export const requestSwap = async (req, res) => {
  try {
      const { itemId, message } = req.body;
  
      const item = await Item.findById(itemId).populate('uploadedBy');
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      if (item.uploadedBy._id.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: 'Cannot swap your own item' });
      }
  
      if (item.status !== 'available') {
        return res.status(400).json({ message: 'Item not available for swap' });
      }
  
      const existingRequest = await SwapRequest.findOne({
        item: itemId,
        requester: req.user._id,
        status: 'pending'
      });
  
      if (existingRequest) {
        return res.status(400).json({ message: 'Swap request already exists' });
      }
  
      const swapRequest = await SwapRequest.create({
        item: itemId,
        requester: req.user._id,
        owner: item.uploadedBy._id,
        message
      });
  
      await swapRequest.populate(['item', 'requester', 'owner']);
      res.status(201).json(swapRequest);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Accept or reject a swap request
 * @route PATCH /api/v1/swaps/:id/status
 * @access Private
 */
export const updateSwapStatus = async (req, res) => {
  try {
    console.log(req.body);
    const { status } = req.body;
    const swapRequest = await SwapRequest.findById(req.params.id)
      .populate(['item', 'requester', 'owner']);

    if (!swapRequest) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    if (swapRequest.owner._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    swapRequest.status = status;
    await swapRequest.save();

    if (status === 'accepted') {
      await Item.findByIdAndUpdate(swapRequest.item._id, { status: 'swapped' });
      
      // Award points to both users
      await User.findByIdAndUpdate(swapRequest.owner._id, { $inc: { points: 50 } });
      await User.findByIdAndUpdate(swapRequest.requester._id, { $inc: { points: 25 } });
    }

    res.json(swapRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
