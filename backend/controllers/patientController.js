const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");

// ADD PATIENT
const addPatient = async (req, res) => {
  try {

    const patient =
      await Patient.create({
        ...req.body,

        patientId:
          "PAT" + Date.now(),
      });

    res.status(201).json(
      patient
    );

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL PATIENTS
const getPatients = async (req, res) => {
  try {

    const search =
      req.query.search || "";

    const patients =
      await Patient.find({
        name: {
          $regex: search,
          $options: "i",
        },
      });

    res.json({
      patients,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE PATIENT
const deletePatient = async (req, res) => {
  try {

    const appointments =
      await Appointment.find({
        patient: req.params.id,
      });

    if (
      appointments.length > 0
    ) {
      return res.status(400).json({
        message:
          "Cannot delete patient with appointments",
      });
    }

    await Patient.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Patient deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addPatient,
  getPatients,
  deletePatient,
};