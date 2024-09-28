const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
    try {
        const { name, description, categoryId } = req.body;

        const subcategory = new Subcategory({ name, description, categoryId });
        await subcategory.save();

        // Add subcategory to category's subcategories list
        await Category.findByIdAndUpdate(categoryId, { $push: { subcategories: subcategory._id } });

        res.status(201).json(subcategory);
    } catch (error) {
        res.status(400).json({ message: 'Subcategory creation failed', error });
    }
};

// Get all subcategories for a category
exports.getSubcategoriesByCategoryId = async (req, res) => {
    try {
        const subcategories = await Subcategory.find({ categoryId: req.params.categoryId }).populate('products');
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving subcategories', error });
    }
};
