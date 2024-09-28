const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: 'Category creation failed', error });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('subcategories');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error });
    }
};
