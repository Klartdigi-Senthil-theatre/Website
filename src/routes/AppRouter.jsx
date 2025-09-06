// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import SeatSelection from "../pages/SeatSelection";
import TicketPage from "../pages/TicketPage";
import TermsAndConditions from "../pages/TermsAndConditions";
import Notification from "../components/Notification";

function App() {
  return (
    <Router>
      <Notification />
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="text-center py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <Link to="/" className="block text-center w-fit mx-auto">
            <h1 className="text-lg font-semibold cursor-pointer text-center w-fit">
              Senthil Theater, Kattuputhur
            </h1>
          </Link>
        </div>

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/select-seats" element={<SeatSelection />} />
            <Route path="/get-tickets" element={<TicketPage />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
          </Routes>
        </div>
        {/* <Footer /> */}
        <div className="bg-gray-800 text-white text-center p-4">
          <p>
            &copy; 2025 klartdigi. All rights reserved. Developed by Klartdigi.
          </p>
          <p className="text-blue-500">
            <Link
              to="/terms-and-conditions"
              className="cursor-pointer hover:underline"
            >
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </Router>
  );
}

export default App;
