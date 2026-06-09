import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { SearchProvider } from "./contexts/SearchContext";
import PrivateRoute from "./components/Models/Auth/PrivateRoute";

// Pages publiques
import LandingPage from "./components/Pages/Public/LandingPage";
import TripsPage from "./components/Pages/Public/TripsPage";
import AuthPage from "./components/Pages/Public/AuthPage";
import LegalPage from "./components/Pages/Public/Support/LegalPage";
import PrivacyPage from "./components/Pages/Public/Support/PrivacyPage";
import ContactPage from "./components/Pages/Public/Support/ContactPage";

import AccountPage from "./components/Pages/User/AccountPage";
import PublishTripPage from "./components/Pages/User/PublishTripPage";
import AdminPage from "./components/Pages/Admin/AdminPage";
import EmployeePage from "./components/Pages/Employee/EmployeePage.jsx";

export default function App() {
  return (
    <Router>
      <SearchProvider>
        <Routes>
          {/* --- Public routes --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
           
          {/* --- Private routes --- */}
          <Route element={<PrivateRoute />}>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/publishTrip" element={<PublishTripPage />} />
          </Route>
          
          {/* --- Admin routes --- */}
          <Route element={<PrivateRoute expectedRoleId={1} />}>
            <Route path="/admin/dashboard" element={<AdminPage />} />
          </Route>

          {/* --- Employee routes --- */}
          <Route element={<PrivateRoute expectedRoleId={2} />}>
            <Route path="/moderation/dashboard" element={<EmployeePage />} />
          </Route>
          
          {/* --- Default redirection --- */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </SearchProvider>
    </Router>
  );
}

      
        
          

          

         
