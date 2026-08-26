import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";
import EditPatient from "./pages/EditPatient";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/patients" element={<Patients />} />

          <Route
            path="/patients/add"
            element={<AddPatient />}
          />

          <Route
            path="/patients/edit/:id"
            element={<EditPatient />}
          />

          <Route
            path="/doctors"
            element={<Doctors />}
          />

          <Route
            path="/appointments"
            element={<Appointments />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;