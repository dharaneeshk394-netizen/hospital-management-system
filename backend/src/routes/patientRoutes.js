const express = require("express");

const patientController = require("../controllers/patientController");

const router = express.Router();

// GET all patients
router.get("/", patientController.getPatients);

// GET one patient
router.get("/:id", patientController.getPatientById);

// CREATE patient
router.post("/", patientController.createPatient);

// UPDATE patient
router.put("/:id", patientController.updatePatient);

// DELETE patient
router.delete("/:id", patientController.deletePatient);

module.exports = router;