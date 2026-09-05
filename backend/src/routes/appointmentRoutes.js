const express = require("express");

const appointmentController = require("../controllers/appointmentController");

const router = express.Router();

// Get all appointments
router.get("/", appointmentController.getAppointments);

// Get one appointment by ID
router.get("/:id", appointmentController.getAppointmentById);

// Create appointment
router.post("/", appointmentController.createAppointment);

// Update appointment
router.put("/:id", appointmentController.updateAppointment);

// Delete appointment
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;