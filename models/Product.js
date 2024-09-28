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
        ref: 'Subcategory', // Reference to the Subcategory
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
