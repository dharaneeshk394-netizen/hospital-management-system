const express = require("express");

const admissionController = require("../controllers/admissionController");

const router = express.Router();

// Get all admissions
router.get(
  "/",
  admissionController.getAdmissions
);

// Get one admission
router.get(
  "/:id",
  admissionController.getAdmissionById
);

// Create admission
router.post(
  "/",
  admissionController.createAdmission
);

// Update admission
router.put(
  "/:id",
  admissionController.updateAdmission
);

// Delete admission
router.delete(
  "/:id",
  admissionController.deleteAdmission
);

module.exports = router;