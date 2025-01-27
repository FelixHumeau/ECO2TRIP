import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.js";

// Lazy loading des pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const QuestionnairePage = lazy(() => import("./pages/QuestionnairePage"));
const ProposedTripsPage = lazy(() => import("./pages/ProposedTripsPage"));
const SummaryPage = lazy(() => import("./pages/SummaryPage"));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Chargement...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/trips" element={<ProposedTripsPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
