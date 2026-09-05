import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "../components/StatusBadge";
import {
  deleteDepartment,
  getDepartments,
} from "../services/departmentService";

function Departments() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDepartments();

      setDepartments(data);
    } catch (error) {
      console.error(
        "Error loading departments:",
        error
      );

      setError(
        error.message ||
          "Failed to load departments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setError("");

      await deleteDepartment(id);

      setDepartments(
        (previousDepartments) =>
          previousDepartments.filter(
            (department) =>
              department.id !== id
          )
      );
    } catch (error) {
      console.error(
        "Error deleting department:",
        error
      );

      setError(
        error.message ||
          "Failed to delete department. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="page-heading">
        <h2>Departments</h2>

        <p>
          Manage hospital departments and services.
        </p>
      </div>

      <section className="dashboard-section">
        <div className="form-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() =>
              navigate("/departments/add")
            }
          >
            Add Department
          </button>
        </div>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <div className="table-container">
          {loading ? (
            <div className="empty-state">
              <p>
                Loading departments...
              </p>
            </div>
          ) : departments.length === 0 ? (
            <div className="empty-state">
              <p>
                No departments found.
              </p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Department ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {departments.map(
                  (department) => (
                    <tr
                      key={department.id}
                    >
                      <td>
                        {
                          department.departmentId
                        }
                      </td>

                      <td>
                        <strong>
                          {department.name}
                        </strong>
                      </td>

                      <td>
                        {department.description ||
                          "-"}
                      </td>

                      <td>
                        <StatusBadge
                          status={
                            department.status
                          }
                        />
                      </td>

                      <td>
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() =>
                            navigate(
                              `/departments/edit/${department.id}`
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() =>
                            handleDelete(
                              department.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default Departments;