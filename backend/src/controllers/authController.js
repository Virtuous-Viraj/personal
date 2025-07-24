const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
};

async function register (req, res) {
    try {
        const { name, email, phoneNo, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            id: generateUniqueId(),
            name,
            email,
            phoneNo,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

async function allUsers() {
    const user = await User.find(); // or findOne({ email: '...' })
    return user;
}

async function addSingleUser() {
    try {
        const newUser = new User({
            id: 0,
            name: 'John Doe',
            email: 'john.doe@example.com',
            phoneNo: '9876543210',
            password: 'testtsfw'
        });

        const savedUser = await newUser.save();
        console.log('✅ User saved:', savedUser);
    } catch (error) {
        console.error('❌ Error saving user:', error.message);
    }
}

async function login (req, res) {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.find({ email });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phoneNo: user.phoneNo
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = {allUsers, login, register, addSingleUser};

