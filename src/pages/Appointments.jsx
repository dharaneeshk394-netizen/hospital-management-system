import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "../components/StatusBadge";
import {
  deleteAppointment,
  getAppointments,
} from "../services/appointmentService";

function Appointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAppointments();

      setAppointments(data);
    } catch (error) {
      console.error("Error loading appointments:", error);

      setError(
        error.message || "Failed to load appointments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setError("");

      await deleteAppointment(id);

      setAppointments((previousAppointments) =>
        previousAppointments.filter(
          (appointment) => appointment.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Error deleting appointment:",
        error
      );

      setError(
        error.message ||
          "Failed to delete appointment. Please try again."
      );
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) {
      return "-";
    }

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="page-heading">
        <h2>Appointments</h2>

        <p>
          Manage patient appointments.
        </p>
      </div>

      <section className="dashboard-section">
        <div className="form-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/appointments/add")}
          >
            Add Appointment
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
              <p>Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="empty-state">
              <p>No appointments found.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      {appointment.appointmentId}
                    </td>

                    <td>
                      <strong>
                        {appointment.patientName}
                      </strong>
                    </td>

                    <td>
                      {appointment.doctorName}
                    </td>

                    <td>
                      {appointment.specialization || "-"}
                    </td>

                    <td>
                      {formatDate(
                        appointment.appointmentDate
                      )}
                    </td>

                    <td>
                      {formatTime(
                        appointment.appointmentTime
                      )}
                    </td>

                    <td>
                      <StatusBadge
                        status={appointment.status}
                      />
                    </td>

                    <td>
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                          navigate(
                            `/appointments/edit/${appointment.id}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                          handleDelete(appointment.id)
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

export default Appointments;