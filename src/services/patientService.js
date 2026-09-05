const API_BASE_URL = "http://localhost:5000/api/v1/patients";

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

// Get all patients
export async function getPatients() {
  const result = await apiRequest(API_BASE_URL);

  return result.data;
}

// Get one patient by ID
export async function getPatientById(id) {
  const result = await apiRequest(
    `${API_BASE_URL}/${id}`
  );

  return result.data;
}

// Create a patient
export async function createPatient(patientData) {
  const result = await apiRequest(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify({
      name: patientData.name,
      age: Number(patientData.age),
      gender: patientData.gender,
      phone: patientData.phone,
      email: patientData.email || "",
      bloodGroup: patientData.bloodGroup || "",
      status: patientData.status || "Active",
    }),
  });

  return result.data;
}

// Update a patient
export async function updatePatient(id, patientData) {
  const result = await apiRequest(
    `${API_BASE_URL}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        name: patientData.name,
        age: Number(patientData.age),
        gender: patientData.gender,
        phone: patientData.phone,
        email: patientData.email || "",
        bloodGroup: patientData.bloodGroup || "",
        status: patientData.status || "Active",
      }),
    }
  );

  return result.data;
}

// Delete a patient
export async function deletePatient(id) {
  const result = await apiRequest(
    `${API_BASE_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  return result.data;
}