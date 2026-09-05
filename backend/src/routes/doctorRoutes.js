const express = require("express");

const doctorController = require("../controllers/doctorController");

const router = express.Router();

// Get all doctors
router.get("/", doctorController.getDoctors);

// Get one doctor by ID
router.get("/:id", doctorController.getDoctorById);

// Create doctor
router.post("/", doctorController.createDoctor);

// Update doctor
router.put("/:id", doctorController.updateDoctor);

// Delete doctor
router.delete("/:id", doctorController.deleteDoctor);

module.exports = router;