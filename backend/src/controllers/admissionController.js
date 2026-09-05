const admissionService = require("../services/admissionService");

// Get all admissions
async function getAdmissions(req, res) {
  try {
    const admissions =
      await admissionService.getAllAdmissions();

    res.status(200).json({
      success: true,
      count: admissions.length,
      data: admissions,
    });
  } catch (error) {
    console.error(
      "Error getting admissions:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get admissions",
    });
  }
}

// Get admission by ID
async function getAdmissionById(req, res) {
  try {
    const admission =
      await admissionService.getAdmissionById(
        req.params.id
      );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    res.status(200).json({
      success: true,
      data: admission,
    });
  } catch (error) {
    console.error(
      "Error getting admission:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get admission",
    });
  }
}

// Create admission
async function createAdmission(req, res) {
  try {
    const {
      patientId,
      doctorId,
      roomNumber,
      bedNumber,
      admissionDate,
      expectedDischargeDate,
      actualDischargeDate,
      diagnosis,
      status,
    } = req.body;

    // Required field validation
    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "Patient is required",
      });
    }

    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "Doctor is required",
      });
    }

    if (!admissionDate) {
      return res.status(400).json({
        success: false,
        message: "Admission date is required",
      });
    }

    const admission =
      await admissionService.createAdmission({
        patientId,
        doctorId,
        roomNumber:
          roomNumber?.trim() || "",
        bedNumber:
          bedNumber?.trim() || "",
        admissionDate,
        expectedDischargeDate:
          expectedDischargeDate || null,
        actualDischargeDate:
          actualDischargeDate || null,
        diagnosis:
          diagnosis?.trim() || "",
        status:
          status || "Admitted",
      });

    res.status(201).json({
      success: true,
      message: "Admission created successfully",
      data: admission,
    });
  } catch (error) {
    console.error(
      "Error creating admission:",
      error
    );

    // Invalid patient/doctor foreign key
    if (error.code === "23503") {
      return res.status(400).json({
        success: false,
        message:
          "Invalid patient or doctor selected",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create admission",
    });
  }
}

// Update admission
async function updateAdmission(req, res) {
  try {
    const admission =
      await admissionService.updateAdmission(
        req.params.id,
        req.body
      );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admission updated successfully",
      data: admission,
    });
  } catch (error) {
    console.error(
      "Error updating admission:",
      error
    );

    // Invalid patient/doctor foreign key
    if (error.code === "23503") {
      return res.status(400).json({
        success: false,
        message:
          "Invalid patient or doctor selected",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update admission",
    });
  }
}

// Delete admission
async function deleteAdmission(req, res) {
  try {
    const admission =
      await admissionService.deleteAdmission(
        req.params.id
      );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admission deleted successfully",
      data: admission,
    });
  } catch (error) {
    console.error(
      "Error deleting admission:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete admission",
    });
  }
}

module.exports = {
  getAdmissions,
  getAdmissionById,
  createAdmission,
  updateAdmission,
  deleteAdmission,
};