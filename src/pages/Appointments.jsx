import StatusBadge from "../components/StatusBadge";

const appointments = [
  {
    id: "APT001",
    patient: "Arun Kumar",
    doctor: "Dr. Rajesh Kumar",
    department: "Cardiology",
    date: "2026-08-26",
    time: "10:00 AM",
    status: "Scheduled",
  },
  {
    id: "APT002",
    patient: "Priya Devi",
    doctor: "Dr. Anitha Sharma",
    department: "Pediatrics",
    date: "2026-08-26",
    time: "11:30 AM",
    status: "Scheduled",
  },
  {
    id: "APT003",
    patient: "Ravi Kumar",
    doctor: "Dr. Suresh Babu",
    department: "Neurology",
    date: "2026-08-25",
    time: "02:00 PM",
    status: "Completed",
  },
  {
    id: "APT004",
    patient: "Meena Devi",
    doctor: "Dr. Meena Devi",
    department: "Dermatology",
    date: "2026-08-27",
    time: "09:30 AM",
    status: "Cancelled",
  },
];

function Appointments() {
  return (
    <div>
      <div className="page-heading">
        <h2>Appointments</h2>

        <p>
          Manage patient appointments.
        </p>
      </div>

      <section className="dashboard-section">
        <div className="table-container">
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
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>

                  <td>
                    <strong>
                      {appointment.patient}
                    </strong>
                  </td>

                  <td>{appointment.doctor}</td>

                  <td>{appointment.department}</td>

                  <td>{appointment.date}</td>

                  <td>{appointment.time}</td>

                  <td>
                    <StatusBadge
                      status={appointment.status}
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

export default Appointments;