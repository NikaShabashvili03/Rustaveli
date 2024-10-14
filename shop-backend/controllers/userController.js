const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
   try {
        const {name, lastname, email, company, position, password } = req.body;

        const existUser = await User.findOne({
            email: email
        })

        if(existUser) return res.status(409).json({ message : "user not found"})
   
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new User({
            name:  name,
            lastname: lastname,
            email: email,
            company: {
                name:company,
                position:position
            },
            hashedPassword: hash
        })

        if(!user) return res.status(402).json({ message: "Email not corret" })
        const savedUser = await user.save();
        const { hashedPassword, ...userData } = savedUser?._doc;
        res.json(userData);
    } catch (err) {console.log(err)
        res.status(500).json({
            message: 'Something went wrong',
        });

    }}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if(!user) { 
            return res.status(404).json({
                message: 'Email not found'
            });
        }

        const isValidPass = await bcrypt.compare(password, user.hashedPassword);

        if (!isValidPass) {
            return res.status(404).json({
              message: 'Password is not correct'
            });
        }

        const token = jwt.sign({
            _id: user._id,
        }, process.env.USER_JWT_SECRET, { expiresIn: '30d' })

        const { hashedPassword, ...userData } = user?._doc;

        res.json({
            ...userData,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}


exports.profile = async (req, res) => {
    try {
        const userId = req.userId;
        
        const user = await User.findById(userId)

        if(!user) { 
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const { hashedPassword, ...userData } = user?._doc;

        res.json(userData);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}