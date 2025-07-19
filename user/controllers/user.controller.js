const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

const ErrorHendler = require("../utils/errorHandler");


exports.userDetails = async (req, res, next) => {
  try {
    const user = {
      name: "Prashant",
      email: "prashantxu@gmail.com",
    };
    if (!user) return next(new ErrorHendler("User not found", 404));
    
    res.status(200).json({
        success:true,
        message: "User details fetched successfully",
        data:user,
    })
  } catch (error) {
    next(new ErrorHendler(error.message, error.statusCode || 500));
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("DB Error:", err); // debug line
    res.status(500).json({ success: false, message: "Server error, maybe table doesn't exist." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) return res.status(400).json({ message: "Invalid credentials", success: false });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials", success: false });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ message: "Logged in successfully", token, success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

exports.protectedData = (req, res) => {
  res.json({ message: "You are authenticated", success: true, user: req.user });
};
