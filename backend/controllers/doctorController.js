const User = require("../models/User");
const bcrypt = require("bcryptjs");


// ADD DOCTOR
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      department,
      experience,
      consultationFee,
      availability,
    } = req.body;

    const existingDoctor = await User.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
      specialization,
      department,
      experience,
      consultationFee,
      availability,
    });

    res.status(201).json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL DOCTORS
const getDoctors = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        }
      : {};

    const specializationFilter = req.query.specialization
      ? {
          specialization: req.query.specialization,
        }
      : {};

    const doctors = await User.find({
      role: "doctor",
      ...keyword,
      ...specializationFilter,
    }).select("-password");

    res.json(doctors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE DOCTOR
const getDoctor = async (req, res) => {
  try {
    const doctor = await User.findById(
      req.params.id
    ).select("-password");

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE DOCTOR
const updateDoctor = async (req, res) => {
  try {
    const doctor = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).select("-password");

    res.json(doctor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE DOCTOR
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await User.findByIdAndDelete(
      req.params.id
    );

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      message: "Doctor deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};