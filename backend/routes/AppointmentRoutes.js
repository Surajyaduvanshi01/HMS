const express = require("express");

const router = express.Router();

const {
  bookAppointment,
  getAppointments,
  getAppointment,
  updateAppointmentStatus,
  deleteAppointment,
} = require("../controllers/appointmentController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");


// BOOK
router.post(
  "/",
  protect,
  adminOnly,
  bookAppointment
);


// GET ALL
router.get("/", protect, getAppointments);


// GET SINGLE
router.get("/:id", protect, getAppointment);


// UPDATE STATUS
router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateAppointmentStatus
);


// DELETE
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteAppointment
);

module.exports = router;