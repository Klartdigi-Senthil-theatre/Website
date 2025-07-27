// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SeatSelection from "../pages/SeatSelection";
import Footer from "../components/Footer";
import TicketPage from "../pages/TicketPage";
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
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
