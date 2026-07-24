// src/pages/admin/AdminPage.tsx
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

export function AdminPage() {
  const { status, login } = useAdminAuth();

  if (status === 'checking') {
    return null; // avoid a flash of the login form while the session check is in flight
  }

  if (status === 'unauthenticated') {
    return <AdminLogin onLogin={login} />;
  }

  return <AdminDashboard />;
}