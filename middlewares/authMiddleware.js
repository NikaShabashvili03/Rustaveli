const User = require('../models/User');

exports.adminAuth = async (req, res, next) => {
    const userId = req.userId; // Assume userId is extracted from token
    const user = await User.findById(userId);

    if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    next();
};
