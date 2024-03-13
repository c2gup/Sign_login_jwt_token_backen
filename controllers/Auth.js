const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Secure password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await User.create({ name, email, password: hashedPassword, role });

    return res.status(200).json({
      success: true,
      message: 'User created successfully',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'User cannot be registered, please try again later',
    });
  }
};


exports.login = async (req, res) => {
  try {
    // Data fetch
    const { email, password } = req.body;

    // Validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all the details carefully',
      });
    }

    // Check for registered user
    let user = await User.findOne({ email });

    // If not a registered user
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User is not registered',
      });
    }

    // Verify password and generate a JWT token
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      
      res.cookie("anupmcookies", token, options).status(200).json({
        success: true,
        token,
        user,
        message: 'User logged in successfully',
      });
     
    } else {
      // Password does not match
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Login failure',
    });
  }
};
