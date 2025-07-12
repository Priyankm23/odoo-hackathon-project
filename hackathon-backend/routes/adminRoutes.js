import express from 'express';
import {
  getPendingItems,
  approveItem,
  rejectItem,
  getAdminLogs,
  getAdminDashboard
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const adminRouter = express.Router();

adminRouter.get('/items/pending', protect, adminOnly, getPendingItems);
adminRouter.patch('/items/:id/approve', protect, adminOnly, approveItem);
adminRouter.delete('/items/:id', protect, adminOnly, rejectItem);
adminRouter.get('/logs', protect, adminOnly, getAdminLogs);
adminRouter.get('/dashboard', protect, adminOnly, getAdminDashboard);

export default adminRouter;