const express = require("express");

const departmentController = require("../controllers/departmentController");

const router = express.Router();

// Get all departments
router.get(
  "/",
  departmentController.getDepartments
);

// Get one department
router.get(
  "/:id",
  departmentController.getDepartmentById
);

// Create department
router.post(
  "/",
  departmentController.createDepartment
);

// Update department
router.put(
  "/:id",
  departmentController.updateDepartment
);

// Delete department
router.delete(
  "/:id",
  departmentController.deleteDepartment
);

module.exports = router;