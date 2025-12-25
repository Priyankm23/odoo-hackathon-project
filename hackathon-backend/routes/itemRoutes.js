import {Router} from 'express';
import { createItem, getAllItems, getItemById } from '../controllers/itemController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';
import Item from '../models/Item.js';

const itemRouter = Router();

itemRouter.post('/', protect, upload.array('images', 3), createItem);
itemRouter.get('/', getAllItems);
itemRouter.get('/:id', getItemById);
itemRouter.get('/user/my-items', protect, async (req, res) => {
  try {
    const items = await Item.find({ uploadedBy: req.user._id })
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default itemRouter;

