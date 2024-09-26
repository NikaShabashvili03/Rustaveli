const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

// Middleware to verify token and check for admin role
const adminAuth = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Split to get token from "Bearer token"

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId; // Set user ID from token to request object

        const user = await User.findById(req.user);

        if (user && user.role === 'admin') {
            next(); // User is an admin, proceed to the next middleware/route
        } else {
            return res.status(403).json({ msg: 'Access denied, admin only' });
        }
    } catch (err) {
        console.error('Authorization error:', err);
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Middleware to verify token for general access
const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId; // Set user ID from token to request object
        next(); // Proceed to the next middleware/route
    } catch (err) {
        console.error('Authorization error:', err);
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Export the middleware functions
module.exports = {
    adminAuth,
    auth,
};
