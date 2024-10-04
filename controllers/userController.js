const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // This should only appear once

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }

    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('Get users error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Function to update user role
const updateUserRole = async (req, res) => {
    const { userId } = req.params; // Retrieves the userId from the URL
    const { userType } = req.body; // Gets the new userType from the request body

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update the userType
        user.userType = userType; // Assuming userType is the field for roles
        await user.save();

        res.status(200).json({ msg: 'User role updated successfully', user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    updateUserRole,
};
