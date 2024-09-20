import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  prod_id: {
    type: String,
    required: [true, 'Product ID is required'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  image: {
    type: String,
  },
  images: [String],
}, { timestamps: true }); // Adds createdAt and updatedAt fields

export const Product = mongoose.model('Product', ProductSchema);
