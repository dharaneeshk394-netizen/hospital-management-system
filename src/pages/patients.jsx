import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  deletePatient,
  getPatients,
} from "../services/patientService";

import StatusBadge from "../components/StatusBadge";

function Patients() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const patientsPerPage = 5;

  const loadPatients = () => {
    setPatients(getPatients());
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return patients.filter((patient) => {
      const fullName =
        `${patient.firstName} ${patient.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search) ||
        patient.id.toLowerCase().includes(search) ||
        patient.phone.includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, searchTerm, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredPatients.length / patientsPerPage
    )
  );

  const startIndex =
    (currentPage - 1) * patientsPerPage;

  const currentPatients = filteredPatients.slice(
    startIndex,
    startIndex + patientsPerPage
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (patient) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${patient.firstName} ${patient.lastName}?`
    );

    if (!confirmed) {
      return;
    }

    deletePatient(patient.id);

    loadPatients();

    setCurrentPage(1);
  };

  return (
    <div>
      <div className="page-heading page-heading-with-action">
        <div>
          <h2>Patients</h2>

          <p>
            Manage hospital patient records.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/patients/add")}
        >
          + Add Patient
        </button>
      </div>

      <section className="dashboard-section">
        <div className="patient-toolbar">
          <div className="search-field">
            <label htmlFor="patient-search">
              Search patients
            </label>

            <input
              id="patient-search"
              type="search"
              value={searchTerm}
              placeholder="Search by name, ID, or phone..."
              onChange={handleSearchChange}
            />
          </div>

          <div className="filter-field">
            <label htmlFor="status-filter">
              Status
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Group</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentPatients.length > 0 ? (
                currentPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>

                    <td>
                      <strong>
                        {patient.firstName}{" "}
                        {patient.lastName}
                      </strong>
                    </td>

                    <td>{patient.age}</td>

                    <td>{patient.gender}</td>

                    <td>{patient.bloodGroup}</td>

                    <td>{patient.phone}</td>

                    <td>
                      <StatusBadge
                        status={patient.status}
                      />
                    </td>

                    <td>
                      <div className="table-actions">
                        <button
                          type="button"
                          className="small-button"
                          onClick={() =>
                            navigate(
                              `/patients/edit/${patient.id}`
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="small-button danger-button"
                          onClick={() =>
                            handleDelete(patient)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="empty-state"
                  >
                    <strong>
                      No patients found
                    </strong>

                    <p>
                      Try changing your search or filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredPatients.length > 0 && (
          <div className="pagination-container">
            <p className="pagination-info">
              Showing{" "}
              {startIndex + 1}–
              {Math.min(
                startIndex + patientsPerPage,
                filteredPatients.length
              )}{" "}
              of {filteredPatients.length} patients
            </p>

            <div className="pagination-controls">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
                }
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={
                    currentPage === page
                      ? "active-page"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  aria-current={
                    currentPage === page
                      ? "page"
                      : undefined
                  }
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(
                      page + 1,
                      totalPages
                    )
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Patients;