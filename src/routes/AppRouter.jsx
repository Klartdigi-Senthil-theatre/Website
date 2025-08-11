// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/select-seats" element={<SeatSelection />} />
            <Route path="/get-tickets" element={<TicketPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          </Routes>
        </div>
        {/* <Footer /> */}
          <div className="bg-gray-800 text-white text-center p-4">
            <p>&copy; 2025 klartdigi. All rights reserved. Developed by Klartdigi.</p>
            <p className="text-blue-500">
              <button
                className="cursor-pointer"
                onClick={() => window.location.href = '/terms-and-conditions'}
              >
                Terms & Conditions
              </button>
            </p>
          </div>
      </div>
    </Router>
  );
}

export default App;
