const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define the Admin schema
const AdminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Email validation
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    hashedPassword: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically create createdAt and updatedAt fields
});

// Create the Admin model
module.exports = model('Admin', AdminSchema);
