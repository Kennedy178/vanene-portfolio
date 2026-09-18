// src/App.tsx
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { useTheme } from './hooks/useTheme';
import { usePageviewTracking } from './hooks/usePageviewTracking';
import './styles/global.css';

const AdminPage = lazy(() =>
  import('./pages/admin/AdminPage').then((m) => ({ default: m.AdminPage }))
);

function AppRoutes({ theme, toggleTheme }: { theme: ReturnType<typeof useTheme>['theme']; toggleTheme: () => void }) {
  const location = useLocation();
  usePageviewTracking(location.pathname);

  return (
    <Routes>
      <Route path="/" element={<HomePage theme={theme} onToggleTheme={toggleTheme} />} />
      <Route
        path="/admin"
        element={
          <Suspense fallback={null}>
            <AdminPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <AppRoutes theme={theme} toggleTheme={toggleTheme} />
    </BrowserRouter>
  );
}

export default App;