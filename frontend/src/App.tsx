// src/App.tsx
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { useTheme } from './hooks/useTheme';
import './styles/global.css';

const AdminPage = lazy(() =>
  import('./pages/admin/AdminPage').then((m) => ({ default: m.AdminPage }))
);

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;