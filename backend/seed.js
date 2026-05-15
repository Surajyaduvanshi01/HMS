const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const connectDB = require("./config/db");

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@gmail.com" });

    if (adminExists) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("123456", 10);

    // Create admin user
    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Default admin created successfully!");
    console.log("Email: admin@gmail.com");
    console.log("Password: 123456");
    console.log("Role: admin");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
