import StatusBadge from "../components/StatusBadge";

const doctors = [
  {
    id: "DOC001",
    name: "Dr. Rajesh Kumar",
    specialization: "Cardiology",
    department: "Cardiology",
    phone: "9876500001",
    status: "Active",
  },
  {
    id: "DOC002",
    name: "Dr. Anitha Sharma",
    specialization: "Pediatrics",
    department: "Pediatrics",
    phone: "9876500002",
    status: "Active",
  },
  {
    id: "DOC003",
    name: "Dr. Suresh Babu",
    specialization: "Neurology",
    department: "Neurology",
    phone: "9876500003",
    status: "Active",
  },
  {
    id: "DOC004",
    name: "Dr. Meena Devi",
    specialization: "Dermatology",
    department: "Dermatology",
    phone: "9876500004",
    status: "Inactive",
  },
];

function Doctors() {
  return (
    <div>
      <div className="page-heading">
        <h2>Doctors</h2>

        <p>
          View hospital doctors and their specializations.
        </p>
      </div>

      <section className="dashboard-section">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>

                  <td>
                    <strong>{doctor.name}</strong>
                  </td>

                  <td>{doctor.specialization}</td>

                  <td>{doctor.department}</td>

                  <td>{doctor.phone}</td>

                  <td>
                    <StatusBadge
                      status={doctor.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Doctors;