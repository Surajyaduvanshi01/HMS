const Bill = require("../models/Bill");
const Appointment = require("../models/Appointment");

// CREATE BILL
const createBill = async (req, res) => {
  try {
    const {
      appointment,
      medicineCharge = 0,
      paymentStatus = "Pending",
    } = req.body;

    const existingBill =
      await Bill.findOne({
        appointment,
      });

    if (existingBill) {
      return res.status(400).json({
        message:
          "Bill already generated for this appointment",
      });
    }

    const appointmentData =
      await Appointment.findById(
        appointment
      ).populate("doctor");

    if (!appointmentData) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    const consultationFee =
      appointmentData.doctor?.consultationFee ??
      0;

    const bill =
      await Bill.create({
        appointment,
        consultationFee,
        medicineCharge: Number(medicineCharge),
        totalAmount:
          consultationFee +
          Number(medicineCharge),
        paymentStatus,
      });

    res.status(201).json(
      bill
    );

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL BILLS
const getBills = async (req, res) => {
  try {

    const bills =
      await Bill.find()
        .populate({
          path: "appointment",

          populate: [
            {
              path: "patient",
            },

            {
              path: "doctor",
            },
          ],
        });

    res.json(bills);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBill,
  getBills,
};