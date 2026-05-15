const express = require("express");

const router = express.Router();

const {
  addPrescription,
  getPrescriptions,
} = require("../controllers/prescriptionController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/", protect, addPrescription);

router.get("/", protect, getPrescriptions);

module.exports = router;