import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    prod_id: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false, // Optional field for image URL
    },
    images: [String], // Array of image URLs
});



export const Product = mongoose.model('Product', ProductSchema);