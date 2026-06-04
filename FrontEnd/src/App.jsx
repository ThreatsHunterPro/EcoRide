import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";
import PrivateRoute from "./components/Models/Auth/PrivateRoute";

import LandingPage from "./components/Pages/Public/LandingPage";
import AuthPage from "./components/Pages/Public/AuthPage";
import LegalPage from "./components/Pages/Public/Support/LegalPage";
import PrivacyPage from "./components/Pages/Public/Support/PrivacyPage";
import ContactPage from "./components/Pages/Public/Support/ContactPage";

import AdminPage from "./components/Pages/Admin/AdminPage";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <Routes>
            {/* --- Public routes --- */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* --- Private routes (Standard Users) --- */}
            <Route element={<PrivateRoute />}>
            </Route>

            {/* --- Admin routes (Role ID 1) --- */}
            <Route element={<PrivateRoute expectedRoleId={1} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            {/* --- Default redirection --- */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}