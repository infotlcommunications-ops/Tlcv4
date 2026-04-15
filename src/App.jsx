import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/public/HomePage';
import PlansPage from './pages/public/PlansPage';
import ComboPlansPage from './pages/public/ComboPlansPage';
import LiveUpdatesPage from './pages/public/LiveUpdatesPage';
import AreasPage from './pages/public/AreasPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import NotFoundPage from './pages/public/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cable-tv-plans" element={<PlansPage type="cable" />} />
        <Route path="/internet-plans" element={<PlansPage type="internet" />} />
        <Route path="/ott-internet-plans" element={<ComboPlansPage />} />
        <Route path="/live-updates" element={<LiveUpdatesPage />} />
        <Route path="/areas-covered" element={<AreasPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin-login" element={<LoginPage />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
