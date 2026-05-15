const Prescription = require("../models/Prescription");


// ADD PRESCRIPTION
const addPrescription = async (req, res) => {
  try {
    const prescription =
      await Prescription.create(req.body);

    res.status(201).json({
      success: true,
      prescription,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET PRESCRIPTIONS
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions =
      await Prescription.find()
        .populate({
          path: "appointment",
          populate: [
            { path: "patient" },
            { path: "doctor" },
          ],
        });

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addPrescription,
  getPrescriptions,
};