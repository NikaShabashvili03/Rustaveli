const Product = require('../models/Product');
const validateObjectId = require('../utils/validateObjectId');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save(); // Remove the accidental 'V[' character here
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Product creation failed', error });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    if (!validateObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Product ID' });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    if (!validateObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Product ID' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!validateObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Product ID' });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
