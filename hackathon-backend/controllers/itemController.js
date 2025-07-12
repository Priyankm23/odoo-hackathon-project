import Item from '../models/Item.js';

/**
 * @desc Create a new clothing item
 * @route POST /api/v1/items
 * @access Private
 */
export const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      size,
      condition,
      tags
    } = req.body;

    const imageUrls = req.files.map(file => file.path); // Cloudinary URLs

    const item = await Item.create({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags,
      images: imageUrls,
      uploadedBy: req.user._id,
      status: 'pending', // requires admin approval
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Item upload failed', error: err.message });
  }
};

/**
 * @desc Get all approved clothing items
 * @route GET /api/v1/items
 * @access Public
 */
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'available' })
      .populate('uploadedBy', 'name');

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items', error: err.message });
  }
};

/**
 * @desc Get item by ID
 * @route GET /api/v1/items/:id
 * @access Public
 */
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('uploadedBy', 'name');

    if (!item) return res.status(404).json({ message: 'Item not found' });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch item', error: err.message });
  }
};
