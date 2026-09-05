const API_BASE_URL =
  "http://localhost:5000/api/v1/departments";

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
    throw new Error(
      "Server returned an invalid response"
    );
  }

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Something went wrong"
    );
  }

  return result;
}

// Get all departments
export async function getDepartments() {
  const result = await apiRequest(API_BASE_URL);

  return result.data;
}

// Get one department by ID
export async function getDepartmentById(id) {
  const result = await apiRequest(
    `${API_BASE_URL}/${id}`
  );

  return result.data;
}

// Create department
export async function createDepartment(
  departmentData
) {
  const result = await apiRequest(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify({
      name: departmentData.name,
      description:
        departmentData.description || "",
      status:
        departmentData.status || "Active",
    }),
  });

  return result.data;
}

// Update department
export async function updateDepartment(
  id,
  departmentData
) {
  const result = await apiRequest(
    `${API_BASE_URL}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        name: departmentData.name,
        description:
          departmentData.description || "",
        status:
          departmentData.status || "Active",
      }),
    }
  );

  return result.data;
}

// Delete department
export async function deleteDepartment(id) {
  const result = await apiRequest(
    `${API_BASE_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  return result.data;
}