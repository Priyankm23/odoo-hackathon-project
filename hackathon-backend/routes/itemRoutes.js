import {Router} from 'express';
import { createItem, getAllItems, getItemById } from '../controllers/itemController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const itemRouter = Router();

itemRouter.post('/', protect, upload.array('images', 3), createItem);
itemRouter.get('/', getAllItems);
itemRouter.get('/:id', getItemById);

export default itemRouter;

