const express = require("express");

const router = express.Router();

const {
  addDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");


// ADD DOCTOR
router.post("/", protect, adminOnly, addDoctor);


// GET ALL DOCTORS
router.get("/", protect, getDoctors);


// GET SINGLE DOCTOR
router.get("/:id", protect, getDoctor);


// UPDATE DOCTOR
router.put("/:id", protect, adminOnly, updateDoctor);


// DELETE DOCTOR
router.delete("/:id", protect, adminOnly, deleteDoctor);

module.exports = router;