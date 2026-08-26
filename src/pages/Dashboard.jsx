import { useEffect, useState } from "react";
import { getPatients } from "../services/patientService";

function Dashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  const totalPatients = patients.length;

  const activePatients = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  const inactivePatients = patients.filter(
    (patient) => patient.status === "Inactive"
  ).length;

  return (
    <div>
      <div className="page-heading">
        <h2>Dashboard</h2>

        <p>
          Welcome to the Hospital Management System.
        </p>
      </div>

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
              Current frontend is running with mock data.
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
            <strong>6</strong>
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
            <span>Mock Patient Data</span>
            <strong className="success-text">
              Working
            </strong>
          </div>

          <div>
            <span>Backend API</span>
            <strong className="pending-text">
              Not connected
            </strong>
          </div>

          <div>
            <span>PostgreSQL</span>
            <strong className="pending-text">
              Not connected
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;