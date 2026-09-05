const API_BASE_URL = "http://localhost:5000/api/v1/appointments";

// Helper function for API requests
async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let result;

  try {
    result = await response.json();
  } catch (error) {
    throw new Error("Server returned an invalid response");
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
}

// Get all appointments
export async function getAppointments() {
  const result = await apiRequest(API_BASE_URL);

  return result.data;
}

// Get one appointment by ID
export async function getAppointmentById(id) {
  const result = await apiRequest(`${API_BASE_URL}/${id}`);

  return result.data;
}

// Create appointment
export async function createAppointment(appointmentData) {
  const result = await apiRequest(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify({
      patientId: Number(appointmentData.patientId),
      doctorId: Number(appointmentData.doctorId),
      appointmentDate: appointmentData.appointmentDate,
      appointmentTime: appointmentData.appointmentTime,
      reason: appointmentData.reason || "",
      status: appointmentData.status || "Scheduled",
    }),
  });

  return result.data;
}

// Update appointment
export async function updateAppointment(id, appointmentData) {
  const result = await apiRequest(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      patientId: Number(appointmentData.patientId),
      doctorId: Number(appointmentData.doctorId),
      appointmentDate: appointmentData.appointmentDate,
      appointmentTime: appointmentData.appointmentTime,
      reason: appointmentData.reason || "",
      status: appointmentData.status || "Scheduled",
    }),
  });

  return result.data;
}

// Delete appointment
export async function deleteAppointment(id) {
  const result = await apiRequest(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return result.data;
}