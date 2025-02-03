import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar.js";
import Loader from "./components/Loader.jsx";
import { SearchProvider } from "./context/SearchContext"; // Import du contexte

// Lazy loading des pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const QuestionnairePage = lazy(() => import("./pages/QuestionnairePage"));
const ProposedTripsPage = lazy(() => import("./pages/ProposedTripsPage"));
const SummaryPage = lazy(() => import("./pages/SummaryPage"));
const CarbonRoutePage = lazy(() => import("./pages/CarbonRoutePage"));

function App() {
  return (
    <SearchProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/questionnaire" element={<QuestionnairePage />} />
            <Route path="/trips" element={<ProposedTripsPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/carbon-calculator" element={<CarbonRoutePage />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </SearchProvider>
  );
}

export default App;
