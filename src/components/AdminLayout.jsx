import { NavLink, Outlet } from 'react-router-dom';
import { logoutAdmin } from '../services/authService';
import { useSiteData } from '../contexts/SiteDataContext';

export default function AdminLayout() {
  const { settings } = useSiteData();

  async function handleLogout() {
    await logoutAdmin();
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <h2>{settings.businessName}</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin">Dashboard</NavLink>
          <NavLink to="/">View Site</NavLink>
        </nav>
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </aside>
      <section className="admin-main">
        <Outlet />
      </section>
    </div>
  );
}
