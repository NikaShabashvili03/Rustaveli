const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as needed

// Password regex for validation
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}$/;

// Register User
const signup = async (req, res) => {
    const {
        name,
        email,
        password,
        phoneNumber,
        newsSubscription,
        userType,
        personalNumber,
        livingAddress,
        organizationName,
        identificationCode,
        actualAddress,
        contactPerson
    } = req.body;

    // Validate password strength
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ msg: 'Password does not meet the required criteria.' });
    }

    // Check if userType and phoneNumber are provided
    if (!userType) {
        return res.status(400).json({ msg: 'User type is required.' });
    }

    if (!phoneNumber) {
        return res.status(400).json({ msg: 'Phone number is required.' });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with role
        user = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            newsSubscription,
            userType, // userType can be 'admin', 'Person', or 'Legal Entity'
            ...(userType === 'Person' && { personalNumber, livingAddress }),
            ...(userType === 'Legal Entity' && { organizationName, identificationCode, actualAddress, contactPerson })
        });

        await user.save();

        // Generate JWT
        const payload = { userId: user._id, role: user.userType }; // Include role in payload
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Set cookie with token
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        });

        res.status(201).json({ msg: 'User registered successfully', token });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Login User
const login= async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return user and token
        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    signup,
    login
};
