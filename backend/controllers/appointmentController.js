const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const User = require("../models/User");


// BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  try {
    const {
      patient,
      doctor,
      appointmentDate,
      appointmentTime,
      reason,
    } = req.body;

    // CHECK PATIENT
    const existingPatient = await Patient.findById(
      patient
    );

    if (!existingPatient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    // CHECK DOCTOR
    const existingDoctor = await User.findOne({
      _id: doctor,
      role: "doctor",
    });

    if (!existingDoctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    const appointment = await Appointment.create({
      patient,
      doctor,
      appointmentDate,
      appointmentTime,
      reason,
    });

    res.status(201).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL APPOINTMENTS
const getAppointments = async (req, res) => {
  try {
    const statusFilter = req.query.status
      ? { status: req.query.status }
      : {};

    const appointments = await Appointment.find(
      statusFilter
    )
      .populate("patient")
      .populate("doctor", "-password")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE APPOINTMENT
const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(
      req.params.id
    )
      .populate("patient")
      .populate("doctor", "-password");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE STATUS
const updateAppointmentStatus = async (
  req,
  res
) => {
  try {
    const appointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        {
          new: true,
        }
      );

    res.json(appointment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE APPOINTMENT
const deleteAppointment = async (
  req,
  res
) => {
  try {
    const appointment =
      await Appointment.findByIdAndDelete(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookAppointment,
  getAppointments,
  getAppointment,
  updateAppointmentStatus,
  deleteAppointment,
};