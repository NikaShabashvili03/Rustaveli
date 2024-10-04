const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; 

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Failed to authenticate token' });
        }
        req.user = decoded; // Save decoded user info to req
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authMiddleware;
