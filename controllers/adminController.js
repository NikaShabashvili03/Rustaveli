const Shop = require('../models/Shop');
const Category = require('../models/Category');
const User = require('../models/User');

// Edit Shop
exports.editShop = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedShop = await Shop.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedShop);
    } catch (error) {
        res.status(500).json({ error: 'Error updating shop' });
    }
};

// Edit Category
exports.editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const editCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });

        if (!editCategory) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        res.json(editCategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Edit User
exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

