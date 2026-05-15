const express = require("express");

const router = express.Router();

const {
  dashboardStats,
  patientsPerMonth,
  genderDistribution,
  dailyAppointments,
  mostVisitedDoctor,
  monthlyRevenue,
  paymentStats,
  departmentStats,
} = require("../controllers/analyticsController");

const {
  protect,
} = require("../middleware/authMiddleware");


router.get(
  "/dashboard",
  protect,
  dashboardStats
);

router.get(
  "/patients-monthly",
  protect,
  patientsPerMonth
);

router.get(
  "/gender-distribution",
  protect,
  genderDistribution
);

router.get(
  "/daily-appointments",
  protect,
  dailyAppointments
);

router.get(
  "/most-visited-doctor",
  protect,
  mostVisitedDoctor
);

router.get(
  "/monthly-revenue",
  protect,
  monthlyRevenue
);

router.get(
  "/payment-stats",
  protect,
  paymentStats
);

router.get(
  "/department-stats",
  protect,
  departmentStats
);

module.exports = router;