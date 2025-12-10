const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtSecret = process.env.JWT_SECRET || 'ChangeThisTravlrSecret!';
const jwtExpiry = '1h';

// POST /api/register  (optional – helps you create a user via Postman)
const register = async (req, res) => {
    try {
        const { username, password, name, email } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const existing = await User.findOne({ username }).exec();
        if (existing) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const user = await User.create({ username, password, name, email });
        return res.status(201).json({ message: 'User created', id: user._id });
    } catch (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'Error registering user', error: err });
    }
};

// POST /api/login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username }).exec();
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isValid = await user.isValidPassword(password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // create token
        const token = jwt.sign(
            {
                sub: user._id.toString(),
                username: user.username
            },
            jwtSecret,
            { expiresIn: jwtExpiry }
        );

        return res.status(200).json({ token });
    } catch (err) {
        console.error('Error logging in:', err);
        return res.status(500).json({ message: 'Error logging in', error: err });
    }
};

module.exports = {
    register,
    login
};
