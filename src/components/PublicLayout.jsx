import { NavLink, Outlet } from 'react-router-dom';
import { useSiteData } from '../contexts/SiteDataContext';
import Loader from './Loader';
import ScrollToTop from './ScrollToTop';

export default function PublicLayout() {
  const { settings, loading } = useSiteData();

  if (loading || !settings) {
    return <Loader fullPage message="Loading..." />;
  }

  return (
    <>
      <ScrollToTop />

      <div className="app-shell">
        <header className="site-header">
          <div className="container header-inner">
            <NavLink to="/" className="brand">
              <img src={settings.logoUrl} alt={settings.businessName} />
              <span>{settings.businessName}</span>
            </NavLink>

            <nav className="nav-links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/cable-tv-plans">Cable TV</NavLink>
              <NavLink to="/internet-plans">Internet</NavLink>
              <NavLink to="/ott-internet-plans">OTT + Internet</NavLink>
              <NavLink to="/live-updates">Live Updates</NavLink>
              <NavLink to="/areas-covered">Areas</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/admin-login" className="btn btn-sm">
                Admin
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="container page-content">
          <Outlet />
        </main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <div>
              <h4>{settings.businessName}</h4>
              <p>{settings.address}</p>
            </div>
            <div>
              <p>{settings.email}</p>
              <p>{settings.supportNumber}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}