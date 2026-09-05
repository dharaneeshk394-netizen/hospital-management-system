const appointmentService = require("../services/appointmentService");

// Get all appointments
async function getAppointments(req, res) {
  try {
    const appointments =
      await appointmentService.getAllAppointments();

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error("Error getting appointments:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get appointments",
    });
  }
}

// Get appointment by ID
async function getAppointmentById(req, res) {
  try {
    const appointment =
      await appointmentService.getAppointmentById(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error("Error getting appointment:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get appointment",
    });
  }
}

// Create appointment
async function createAppointment(req, res) {
  try {
    const {
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      reason,
      status,
    } = req.body;

    if (
      !patientId ||
      !doctorId ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Patient, doctor, date, and time are required",
      });
    }

    const appointment =
      await appointmentService.createAppointment({
        patientId,
        doctorId,
        appointmentDate,
        appointmentTime,
        reason: reason || "",
        status: status || "Scheduled",
      });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create appointment",
    });
  }
}

// Update appointment
async function updateAppointment(req, res) {
  try {
    const appointment =
      await appointmentService.updateAppointment(
        req.params.id,
        req.body
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update appointment",
    });
  }
}

// Delete appointment
async function deleteAppointment(req, res) {
  try {
    const appointment =
      await appointmentService.deleteAppointment(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete appointment",
    });
  }
}

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};