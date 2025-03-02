const jwt = require("jsonwebtoken");
const User = require("../models/user");
const AuthService = require("../services/authService");

class AuthController {
  static async logout(req, res) {
    try {
      const authService = new AuthService();
      await authService.logout(req.token);
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const authService = new AuthService();

      const { user, token } = await authService.registerUser(email, password);
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const authService = new AuthService();

      const { user, token } = await authService.loginUser(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
