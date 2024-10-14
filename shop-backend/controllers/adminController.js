const Admin = require('../models/Admin'); // Ensure you have this model defined
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation

// Example createAdmin function
exports.createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Ensure you're passing these fields from the request

        // Check if the admin already exists
        const existAdmin = await Admin.findOne({ email });
        if (existAdmin) {
            return res.status(409).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create new admin
        const admin = new Admin({
            name,
            email,
            hashedPassword: hash, // Ensure this field matches your Admin model
        });

        const savedAdmin = await admin.save();
        res.status(201).json({ message: 'Admin created successfully', admin: savedAdmin });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Example login function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Compare the password
        const isValidPass = await bcrypt.compare(password, admin.hashedPassword);
        if (!isValidPass) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate a token
        const token = jwt.sign({ _id: admin._id }, process.env.ADMIN_JWT_SECRET, { expiresIn: '30d' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Example profile function
exports.profile = async (req, res) => {
    try {
        const adminId = req.adminId; // Assuming the user ID is set in the request by middleware
        console.log(adminId)
        // Find the admin by ID
        const admin = await Admin.findById(adminId);
        console.log(":))")
        console.log(admin)
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Exclude the hashed password from the response
        const { hashedPassword, ...adminData } = admin._doc;

        res.json(adminData);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Something went wrong' });
    }
};
