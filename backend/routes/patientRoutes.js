const express = require("express");

const {
  addPatient,
  getPatients,
  deletePatient,
} = require(
  "../controllers/patientController"
);

const {
  protect,
  adminOnly,
} = require(
  "../middleware/authMiddleware"
);

const router = express.Router();


// GET ALL PATIENTS
router.get(
  "/",
  protect,
  getPatients
);


// ADD PATIENT
router.post(
  "/",
  protect,
  adminOnly,
  addPatient
);


// DELETE PATIENT
router.delete(
  "/:id",
  protect,
  adminOnly,
  deletePatient
);

module.exports = router;