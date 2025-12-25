import express from 'express';
import { requestSwap, updateSwapStatus } from '../controllers/swapController.js';
import { protect } from '../middlewares/authMiddleware.js';
import SwapRequest from '../models/SwapRequest.js';

const swapRouter = express.Router();

swapRouter.post('/', protect, requestSwap);
swapRouter.patch('/:id/status', protect, updateSwapStatus);
swapRouter.get('/user/my-swaps', protect, async (req, res) => {
  try {
    const sentRequests = await SwapRequest.find({ requester: req.user._id })
      .populate(['item', 'owner'])
      .sort({ createdAt: -1 });

    const receivedRequests = await SwapRequest.find({ owner: req.user._id })
      .populate(['item', 'requester'])
      .sort({ createdAt: -1 });

    res.json({ sent: sentRequests, received: receivedRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default swapRouter;
