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
               Senthil Theater - Best Cinema in Karur | Kattuputhur
             </h1>
           </Link>
           <p className="text-xs opacity-90 mt-1">
             Book Movie Tickets Online • Latest Tamil, Hindi & English Movies • Karur District, Tamil Nadu
           </p>
         </div>

         {/* SEO Banner - Compact */}
         <div className="bg-orange-50 border-b border-orange-200 py-2">
           <div className="max-w-6xl mx-auto px-4">
             <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-700">
               <span className="flex items-center gap-1">
                 <span className="text-orange-500">🎬</span>
                 <span>Best Movie Theater in Karur District</span>
               </span>
               <span className="hidden sm:inline text-gray-400">•</span>
               <span className="flex items-center gap-1">
                 <span className="text-orange-500">📍</span>
                 <span>Conveniently Located in Kattuputhur</span>
               </span>
               <span className="hidden sm:inline text-gray-400">•</span>
               <span className="flex items-center gap-1">
                 <span className="text-orange-500">🕒</span>
                 <span>Show Timings: 11:00 AM - 10:00 PM Daily</span>
               </span>
             </div>
           </div>
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
         {/* Footer */}
         <div className="bg-gray-800 text-white text-center p-4">
           <div className="max-w-4xl mx-auto">
             <h3 className="text-lg font-semibold mb-2">Senthil Theater - Premier Cinema in Karur</h3>
             <p className="text-sm mb-2">
               Located in Kattuputhur, Karur District, Tamil Nadu • Best movie experience with comfortable seating
             </p>
             <p className="text-xs text-gray-400 mb-3">
               Book movie tickets online for latest Tamil, Hindi & English movies • 
               Contact: +91-6374039159 • Email: kumaresan.subramani@klartdigi.com
             </p>
             <div className="flex justify-center space-x-4 text-xs">
               <Link
                 to="/terms-and-conditions"
                 className="text-blue-400 hover:text-blue-300 hover:underline"
               >
                 Terms & Conditions
               </Link>
               <span className="text-gray-600">|</span>
               <span className="text-gray-400">GST: 33CMMPP7822B1Z2</span>
             </div>
             <p className="text-xs text-gray-500 mt-2">
               &copy; 2025 Senthil Theater. All rights reserved. Developed by Klartdigi.
             </p>
           </div>
         </div>
      </div>
    </Router>
  );
}

export default App;
