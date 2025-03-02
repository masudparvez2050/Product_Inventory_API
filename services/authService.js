const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BlacklistedToken = require('../models/blacklistedToken');

class AuthService {
  async isTokenBlacklisted(token) {
    const blacklistedToken = await BlacklistedToken.findOne({ token });
    return !!blacklistedToken;
  }

  async blacklistToken(token) {
    const blacklistedToken = new BlacklistedToken({ token });
    await blacklistedToken.save();
  }

  async registerUser(email, password) {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create new user
    const user = new User({ email, password });
    await user.save();

    // Generate token
    const token = this.generateToken(user._id);

    return { user, token };
  }

  async loginUser(email, password) {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user._id);

    return { user, token };
  }

  generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
  }

  async logout(token) {
    await this.blacklistToken(token);
    return true;
  }
}

module.exports = AuthService;
