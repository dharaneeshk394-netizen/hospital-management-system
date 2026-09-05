import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppLayout from "./components/AppLayout";

import Dashboard from "./pages/Dashboard";

import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";
import EditPatient from "./pages/EditPatient";

import Doctors from "./pages/Doctors";
import AddDoctor from "./pages/AddDoctor";
import EditDoctor from "./pages/EditDoctor";

import Appointments from "./pages/Appointments";
import AddAppointment from "./pages/AddAppointment";
import EditAppointment from "./pages/EditAppointment";

import Departments from "./pages/Departments";
import AddDepartment from "./pages/AddDepartment";
import EditDepartment from "./pages/EditDepartment";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Dashboard */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Patients */}
          <Route
            path="/patients"
            element={<Patients />}
          />

          <Route
            path="/patients/add"
            element={<AddPatient />}
          />

          <Route
            path="/patients/edit/:id"
            element={<EditPatient />}
          />

          {/* Doctors */}
          <Route
            path="/doctors"
            element={<Doctors />}
          />

          <Route
            path="/doctors/add"
            element={<AddDoctor />}
          />

          <Route
            path="/doctors/edit/:id"
            element={<EditDoctor />}
          />

          {/* Appointments */}
          <Route
            path="/appointments"
            element={<Appointments />}
          />

          <Route
            path="/appointments/add"
            element={<AddAppointment />}
          />

          <Route
            path="/appointments/edit/:id"
            element={<EditAppointment />}
          />

          {/* Departments */}
          <Route
            path="/departments"
            element={<Departments />}
          />

          <Route
            path="/departments/add"
            element={<AddDepartment />}
          />

          <Route
            path="/departments/edit/:id"
            element={<EditDepartment />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;