const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    }
});

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
        ref: 'Subcategory', 
        required: true,
    },
    attributes: [attributeSchema],  // Array of attributes
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
