
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import Markets from "./markets/Markets";
import ActivityPage from "./activity/ActivityPage";

import HelpCenter from "./help/HelpCenter";
import FAQ from "./help/FAQ";
import ContactSupport from "./help/ContactSupport";

function App() {
  return (
    <Routes>

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* MARKETS */}
      <Route
        path="/markets"
        element={<Markets />}
      />

      {/* ACTIVITY */}
      <Route
        path="/activity"
        element={<ActivityPage />}
      />

      {/* HELP CENTER */}
      <Route
        path="/help"
        element={<HelpCenter />}
      />

      {/* FAQ */}
      <Route
        path="/help/faq"
        element={<FAQ />}
      />

      {/* CONTACT SUPPORT */}
      <Route
        path="/help/contact"
        element={<ContactSupport />}
      />

      {/* DEFAULT */}
      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  );
}

export default App;

