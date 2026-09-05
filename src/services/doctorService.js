const API_BASE_URL = "http://localhost:5000/api/v1/doctors";

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

// Get all doctors
export async function getDoctors() {
  const result = await apiRequest(API_BASE_URL);

  return result.data;
}

// Get one doctor by ID
export async function getDoctorById(id) {
  const result = await apiRequest(`${API_BASE_URL}/${id}`);

  return result.data;
}

// Create a doctor
export async function createDoctor(doctorData) {
  const result = await apiRequest(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify({
      name: doctorData.name,
      specialization: doctorData.specialization,
      phone: doctorData.phone,
      email: doctorData.email || "",
      department: doctorData.department || "",
      status: doctorData.status || "Active",
    }),
  });

  return result.data;
}

// Update a doctor
export async function updateDoctor(id, doctorData) {
  const result = await apiRequest(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: doctorData.name,
      specialization: doctorData.specialization,
      phone: doctorData.phone,
      email: doctorData.email || "",
      department: doctorData.department || "",
      status: doctorData.status || "Active",
    }),
  });

  return result.data;
}

// Delete a doctor
export async function deleteDoctor(id) {
  const result = await apiRequest(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return result.data;
}