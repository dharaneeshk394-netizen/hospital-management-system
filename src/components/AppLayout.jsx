import { NavLink } from "react-router-dom";

function AppLayout({ children }) {
  const getNavClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="hospital-brand">
          <div className="brand-icon">+</div>

          <div>
            <h2>MedCare</h2>
            <p>Hospital System</p>
          </div>
        </div>

        <nav
          className="sidebar-nav"
          aria-label="Main navigation"
        >
          <NavLink
            to="/dashboard"
            className={getNavClass}
          >
            <span>▣</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/patients"
            className={getNavClass}
          >
            <span>♙</span>
            Patients
          </NavLink>

          <NavLink
            to="/doctors"
            className={getNavClass}
          >
            <span>⚕</span>
            Doctors
          </NavLink>

          <NavLink
            to="/appointments"
            className={getNavClass}
          >
            <span>□</span>
            Appointments
          </NavLink>

          <NavLink
            to="/departments"
            className={getNavClass}
          >
            <span>▤</span>
            Departments
          </NavLink>
        </nav>
      </aside>

      <div className="main-area">
        <header className="top-header">
          <div>
            <h1>Hospital Management System</h1>
          </div>

          <div className="header-user">
            <div className="user-avatar">A</div>

            <div>
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;