const express = require('express');
const router = express.Router();
const { adminAuth, auth } = require('../middleware/authMiddleware'); // Ensure this path is correct

// Example route using the adminAuth middleware
router.post('/admin/some-protected-route', adminAuth, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed by admin' });
});

// Example route using the auth middleware
router.get('/user/some-general-route', auth, (req, res) => {
    res.status(200).json({ message: 'General route accessed' });
});

module.exports = router;
