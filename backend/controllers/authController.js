const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Mock login for demo purposes
  if (email === 'user@store.com' && password === '123456') {
    return res.json({
      _id: 'mock_user_id',
      name: 'Test User',
      email: 'user@store.com',
      isAdmin: false,
      token: generateToken('mock_user_id'),
    });
  }
  
  if (email === 'admin@store.com' && password === '123456') {
    return res.json({
      _id: 'mock_admin_id',
      name: 'Admin User',
      email: 'admin@store.com',
      isAdmin: true,
      token: generateToken('mock_admin_id'),
    });
  }

  if (mongoose.connection.readyState === 1) {
    try {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      }
    } catch (error) {
      console.log('DB Login Error, falling back to mock check.');
    }
  }

  res.status(401).json({ message: 'Invalid email or password' });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

module.exports = { authUser, registerUser };
