const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your actual User model
const router = express.Router();
const { signup } = require('../controllers/authController');
// Password validation regex
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}$/;

// User login route

// Register User
router.post('/signup', signup, async (req, res) => {
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
        return res.status(400).json({ msg: 'Password does not meet the required criteria. Please ensure it contains at least one uppercase letter, one lowercase letter, one number, and one special character.' });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user object with dynamic fields based on user type
        user = new User({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            newsSubscription,
            userType,
            ...(userType === 'Person' && { personalNumber, livingAddress }),
            ...(userType === 'Legal Entity' && { organizationName, identificationCode, actualAddress, contactPerson })
        });
    

        // Save user to database
        await user.save();

        // Create JWT token payload
        const payload = { userId: user.id, userType: user.userType };

        // Generate the JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token
        res.status(201).json({ token });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ msg: 'Server error. Please try again later.' });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid email or password' });  
        }

        // Create JWT token payload
        const payload = { userId: user.id, userType: user.userType };

        // Generate the JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token
        res.json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ msg: 'Server error. Please try again later.' });
    }
});

module.exports = router;