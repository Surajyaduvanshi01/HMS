const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");

// Routes
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const billRoutes = require("./routes/billRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

// Config
dotenv.config();

const app = express();

// =========================
// Middleware
// =========================

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://hms-ui-41aj.onrender.com",
  "https://hms-ui-4laj.onrender.com",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parser
app.use(express.json());

// Request Logger (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// =========================
// API Routes
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/analytics", analyticsRoutes);

// =========================
// Health Check Route
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital Management API Running",
  });
});

// =========================
// 404 Handler
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const createDefaultAdmin = async () => {
  try {
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@gmail.com";
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "123456";
    const adminName = process.env.DEFAULT_ADMIN_NAME || "Admin";

    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
      console.log("✅ Default admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Default admin created successfully!");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  } catch (error) {
    console.error("❌ Error creating default admin:", error.message);
  }
};

// =========================
// Start Server
// =========================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await createDefaultAdmin();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();