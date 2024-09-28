const Product = require('../models/Product');
const Subcategory = require('../models/Subcategory');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, subcategoryId } = req.body;

        const product = new Product({ name, description, price, subcategoryId });
        await product.save();

        // Add product to subcategory's product list
        await Subcategory.findByIdAndUpdate(subcategoryId, { $push: { products: product._id } });

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Product creation failed', error });
    }
};

// Get all products for a subcategory
exports.getProductsBySubcategoryId = async (req, res) => {
    try {
        const products = await Product.find({ subcategoryId: req.params.subcategoryId });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};
