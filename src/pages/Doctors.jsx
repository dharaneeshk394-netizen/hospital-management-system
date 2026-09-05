import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "../components/StatusBadge";
import {
  deleteDoctor,
  getDoctors,
} from "../services/doctorService";

function Doctors() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDoctors();

      setDoctors(data);
    } catch (error) {
      console.error("Error loading doctors:", error);

      setError(
        error.message || "Failed to load doctors"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setError("");

      await deleteDoctor(id);

      setDoctors((previousDoctors) =>
        previousDoctors.filter(
          (doctor) => doctor.id !== id
        )
      );
    } catch (error) {
      console.error("Error deleting doctor:", error);

      setError(
        error.message ||
          "Failed to delete doctor. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="page-heading">
        <h2>Doctors</h2>

        <p>
          View and manage hospital doctors and their
          specializations.
        </p>
      </div>

      <section className="dashboard-section">
        <div className="form-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/doctors/add")}
          >
            Add Doctor
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
              <p>Loading doctors...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="empty-state">
              <p>No doctors found.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Doctor ID</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Department</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.doctorId}</td>

                    <td>
                      <strong>{doctor.name}</strong>
                    </td>

                    <td>
                      {doctor.specialization}
                    </td>

                    <td>
                      {doctor.department || "-"}
                    </td>

                    <td>{doctor.phone}</td>

                    <td>
                      <StatusBadge
                        status={doctor.status}
                      />
                    </td>

                    <td>
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                          navigate(
                            `/doctors/edit/${doctor.id}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                          handleDelete(doctor.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default Doctors;