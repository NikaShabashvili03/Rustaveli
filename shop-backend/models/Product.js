// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    imageUrl: {
        type: String, // URL for product image
        trim: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
