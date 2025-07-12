// controllers/adminController.js
import Item from '../models/Item.js';
import AdminLog from '../models/AdminLog.js';
import User from '../models/User.js';

/**
 * @desc Get all pending items for review
 * @route GET /api/v1/admin/items/pending
 * @access Admin
 */
export const getPendingItems = async (req, res) => {
  try {
      const items = await Item.find({ status: 'pending' })
        .populate('uploadedBy', 'name email')
        .sort({ createdAt: -1 });
  
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Approve item and assign dynamic points
 * @route PATCH /api/v1/admin/items/:id/approve
 * @access Admin
 */
export const approveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.status = 'available';
    await item.save();

    const uploader = await User.findById(item.uploadedBy);
    const pointsEarned = calculatePoints(item); // Dynamic point calculation
    uploader.points += pointsEarned;
    await uploader.save();

    await AdminLog.create({
      adminId: req.user._id,
      action: `approved (earned ${pointsEarned} pts)`,
      itemId: item._id
    });

    res.json({ message: 'Item approved', pointsEarned, item });
  } catch (err) {
    res.status(500).json({ message: 'Approval failed', error: err.message });
  }
};

/**
 * @desc Reject item and log admin action
 * @route DELETE /api/v1/admin/items/:id
 * @access Admin
 */
export const rejectItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    await AdminLog.create({
      adminId: req.user._id,
      action: 'rejected',
      itemId: item._id
    });

    res.json({ message: 'Item rejected and deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Rejection failed', error: err.message });
  }
};

/**
 * @desc Get all admin action logs
 * @route GET /api/v1/admin/logs
 * @access Admin
 */
export const getAdminLogs = async (req, res) => {
  try {
    const logs = await AdminLog.find({}).populate('adminId', 'name');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Fetch logs failed', error: err.message });
  }
};

// Utility: Assign points dynamically based on item properties
function calculatePoints(item) {
  let base = 100;
  if (item.condition?.toLowerCase() === 'brand new') base += 50;
  if (item.tags?.length > 3) base += 20;
  if (item.description?.length > 100) base += 30;
  return base;
}

/**
 * @desc Get admin dashboard info
 * @route GET /api/v1/admin/dashboard
 * @access Admin
 */
export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalItems = await Item.countDocuments();
    const pendingItems = await Item.countDocuments({ status: 'pending' });
    const swappedItems = await Item.countDocuments({ status: 'swapped' });
    const availableItems = await Item.countDocuments({ status: 'available' });
    const approvedLogs = await AdminLog.countDocuments({ action: /approved/i });
    const rejectedLogs = await AdminLog.countDocuments({ action: /rejected/i });

    res.json({
      totalUsers,
      totalItems,
      pendingItems,
      swappedItems,
      availableItems,
      approvedLogs,
      rejectedLogs
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load admin dashboard', error: err.message });
  }
};
