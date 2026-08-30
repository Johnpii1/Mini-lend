
import { useState } from "react";

import Landing from "./pages/Landing Page";
import Dashboard from "./dashboard/Dashboard";
import Markets from "./markets/Markets";
import ActivityPage from "./activity/ActivityPage";

import HelpCenter from "./help/HelpCenter";
import FAQ from "./help/FAQ";
import ContactSupport from "./help/ContactSupport";

import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* =====================================================
          LOADING SCREEN
      ====================================================== */}

      {loading && (
        <LoadingScreen
          onComplete={() => setLoading(false)}
        />
      )}

      {/* =====================================================
          LANDING PAGE
      ====================================================== */}

      <div
        className={`
          transition-opacity
          duration-500
          ${loading ? "opacity-0" : "opacity-100"}
        `}
      >
        <Landing />
      </div>
    </>
  );
}

export default App;

