const express = require("express");
const router = express.Router();
const User = require("../models/User"); 
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ user }); 
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
