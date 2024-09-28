const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Unique name for each category
    },
    description: {
        type: String,
        trim: true,
    },
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }] // Ref to subcategories
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
