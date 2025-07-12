import express from 'express';
import multer from 'multer';
import Item from '../models/Item.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// POST /api/v1/items
router.post('/', protect, upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);

    const item = await Item.create({
      title,
      description,
      images,
      category,
      type,
      size,
      condition,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      uploadedBy: req.user._id
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/v1/items
router.get('/', async (req, res) => {
  try {
    const { category, size, condition, search } = req.query;
    let filter = { status: 'available' };

    if (category) filter.category = category;
    if (size) filter.size = size;
    if (condition) filter.condition = condition;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const items = await Item.find(filter)
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/v1/items/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('uploadedBy', 'name email');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/v1/items/user/my-items
router.get('/user/my-items', protect, async (req, res) => {
  try {
    const items = await Item.find({ uploadedBy: req.user._id })
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;