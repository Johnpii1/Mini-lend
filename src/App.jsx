
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing Page";
import LoadingScreen from "./components/LoadingScreen";
import WhitePaper from "./white paper/WhitePaper";
import Documentation from "./docs/Documentation";

// ============================================================
// LEGAL PAGES
// ============================================================
import PrivacyPolicy from "./legal/PrivacyPolicy";
import TermsOfUse from "./legal/TermsOfUse";
import RiskDisclosure from "./legal/RiskDisclosure";

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
          PAGE CONTENT
      ====================================================== */}
      <div
        className={`
          min-h-screen
          transition-opacity
          duration-500
          ${loading ? "opacity-0" : "opacity-100"}
        `}
      >
        <Routes>

          {/* =================================================
              LANDING PAGE
          ================================================= */}
          <Route
            path="/"
            element={<Landing />}
          />

          {/* =================================================
              WHITE PAPER
          ================================================= */}
          <Route
            path="/whitepaper"
            element={<WhitePaper />}
          />

          {/* =================================================
              DOCUMENTATION
          ================================================= */}
          <Route
            path="/docs"
            element={<Documentation />}
          />

          {/* =================================================
              PRIVACY POLICY
          ================================================= */}
          <Route
            path="/privacy"
            element={<PrivacyPolicy />}
          />

          {/* =================================================
              TERMS OF USE
          ================================================= */}
          <Route
            path="/terms"
            element={<TermsOfUse />}
          />

          {/* =================================================
              RISK DISCLOSURE
          ================================================= */}
          <Route
            path="/risk-disclosure"
            element={<RiskDisclosure />}
          />

        </Routes>
      </div>
    </>
  );
}

export default App;

