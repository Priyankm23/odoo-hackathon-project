import express from 'express';
import { requestSwap, updateSwapStatus } from '../controllers/swapController.js';
import { protect } from '../middlewares/authMiddleware.js';

const swapRouter = express.Router();

swapRouter.post('/', protect, requestSwap);
swapRouter.patch('/:id/status', protect, updateSwapStatus);

export default swapRouter;
