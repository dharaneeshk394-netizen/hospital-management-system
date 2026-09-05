import { useEffect, useState } from "react";

import { getPatients } from "../services/patientService";
import { getDepartments } from "../services/departmentService";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        setError("");

        const [patientData, departmentData] =
          await Promise.all([
            getPatients(),
            getDepartments(),
          ]);

        setPatients(
          Array.isArray(patientData)
            ? patientData
            : []
        );

        setDepartments(
          Array.isArray(departmentData)
            ? departmentData
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load dashboard data:",
          error
        );

        setError(
          error.message ||
            "Failed to load dashboard data"
        );

        setPatients([]);
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const totalPatients = patients.length;

  const activePatients = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  const inactivePatients = patients.filter(
    (patient) => patient.status === "Inactive"
  ).length;

  const totalDepartments = departments.length;

  return (
    <div>
      <div className="page-heading">
        <h2>Dashboard</h2>

        <p>
          Welcome to the Hospital Management System.
        </p>
      </div>

      {loading && (
        <div className="dashboard-section">
          <p>Loading dashboard data...</p>
        </div>
      )}

      {error && (
        <div className="dashboard-section">
          <h3>Unable to load dashboard data</h3>

          <p>{error}</p>

          <p>
            Please make sure the backend server and
            PostgreSQL database are running.
          </p>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">♙</div>

          <p>Total Patients</p>

          <h3>{totalPatients}</h3>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>

          <p>Active Patients</p>

          <h3>{activePatients}</h3>
        </div>

        <div className="stat-card">
          <div className="stat-icon">!</div>

          <p>Inactive Patients</p>

          <h3>{inactivePatients}</h3>
        </div>

        <div className="stat-card">
          <div className="stat-icon">□</div>

          <p>Appointments</p>

          <h3>12</h3>
        </div>
      </div>

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h3>System Overview</h3>

            <p>
              Hospital information is loaded from the
              backend API.
            </p>
          </div>
        </div>

        <div className="overview-grid">
          <div className="overview-card">
            <span>Patients</span>

            <strong>{totalPatients}</strong>
          </div>

          <div className="overview-card">
            <span>Doctors</span>

            <strong>8</strong>
          </div>

          <div className="overview-card">
            <span>Appointments</span>

            <strong>12</strong>
          </div>

          <div className="overview-card">
            <span>Departments</span>

            <strong>{totalDepartments}</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <h3>Development Status</h3>

        <div className="development-list">
          <div>
            <span>React Frontend</span>

            <strong className="success-text">
              Working
            </strong>
          </div>

          <div>
            <span>Patient API</span>

            <strong className="success-text">
              Connected
            </strong>
          </div>

          <div>
            <span>Node.js + Express</span>

            <strong className="success-text">
              Connected
            </strong>
          </div>

          <div>
            <span>PostgreSQL</span>

            <strong className="success-text">
              Connected
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;