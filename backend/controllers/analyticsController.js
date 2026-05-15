const Patient = require("../models/Patient");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Bill = require("../models/Bill");


// DASHBOARD STATS
const dashboardStats = async (req, res) => {
  try {
    const totalPatients =
      await Patient.countDocuments();

    const totalDoctors =
      await User.countDocuments({
        role: "doctor",
      });

    const totalAppointments =
      await Appointment.countDocuments();

    const revenue = await Bill.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    res.json({
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalRevenue:
        revenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// PATIENTS PER MONTH
const patientsPerMonth = async (
  req,
  res
) => {
  try {
    const data = await Patient.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GENDER DISTRIBUTION
const genderDistribution = async (
  req,
  res
) => {
  try {
    const data = await Patient.aggregate([
      {
        $group: {
          _id: "$gender",

          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DAILY APPOINTMENTS
const dailyAppointments = async (
  req,
  res
) => {
  try {
    const data = await Appointment.aggregate([
      {
        $group: {
          _id: {
            day: {
              $dayOfMonth:
                "$appointmentDate",
            },
          },

          total: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// MOST VISITED DOCTOR
const mostVisitedDoctor = async (
  req,
  res
) => {
  try {
    const data = await Appointment.aggregate([
      {
        $group: {
          _id: "$doctor",

          totalAppointments: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          totalAppointments: -1,
        },
      },

      {
        $limit: 1,
      },
    ]);

    const populated =
      await User.populate(data, {
        path: "_id",
        select: "name specialization",
      });

    res.json(populated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// MONTHLY REVENUE
const monthlyRevenue = async (
  req,
  res
) => {
  try {
    const data = await Bill.aggregate([
      {
        $lookup: {
          from: "appointments",
          localField: "appointment",
          foreignField: "_id",
          as: "appointmentData",
        },
      },
      {
        $unwind: "$appointmentData",
      },
      {
        $group: {
          _id: {
            year: {
              $year:
                "$appointmentData.appointmentDate",
            },
            month: {
              $month:
                "$appointmentData.appointmentDate",
            },
          },
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// PAID VS PENDING
const paymentStats = async (
  req,
  res
) => {
  try {
    const data = await Bill.aggregate([
      {
        $group: {
          _id: "$paymentStatus",

          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DEPARTMENT STATS
const departmentStats = async (
  req,
  res
) => {
  try {
    const data = await User.aggregate([
      {
        $match: {
          role: "doctor",
        },
      },

      {
        $group: {
          _id: "$department",

          totalDoctors: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  dashboardStats,
  patientsPerMonth,
  genderDistribution,
  dailyAppointments,
  mostVisitedDoctor,
  monthlyRevenue,
  paymentStats,
  departmentStats,
};