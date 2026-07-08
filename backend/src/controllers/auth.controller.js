const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validator");

const {
  registerUser,
  loginUser,
} = require("../services/auth.service");

const {
  generateToken,
} = require("../utils/jwt");

// ======================================
// Register User
// ======================================
const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(validatedData);

    const token = generateToken(user);

    const { password, ...userWithoutPassword } = user;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Login User
// ======================================
const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await loginUser(
      validatedData.email,
      validatedData.password
    );

    const token = generateToken(user);

    const { password, ...userWithoutPassword } = user;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Logged-in User
// ======================================
const getMe = async (req, res) => {
  try {
    const { password, ...userWithoutPassword } = req.user;

    return res.status(200).json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Logout User
// ======================================
const logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout,
};