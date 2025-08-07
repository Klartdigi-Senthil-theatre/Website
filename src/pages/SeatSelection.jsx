import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SeatLayout from "../components/SeatLayout";
import NavigationButtons from "../components/NavigationButtons";
import PaymentDialog from "../dialog/PaymentDialog";
import UserDetailsDialog from "../dialog/UserDetailsDialog";
import api from "../services/api";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, timing, date, price, showTimeId, showTimePlannerId } =
    location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch booked seats for the showTimePlannerId
  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (!showTimePlannerId) {
        setError("No showtime planner ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(
          `/movie-seat-bookings/show-time-planner/${showTimePlannerId}`
        );

        // Map seatNumber arrays to seatNo values
        const booked = response.data.flatMap((booking) =>
          booking.seatNumber.map((seat) => seat.seatNo)
        );
        setBookedSeats(booked);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch booked seats");
        setBookedSeats([]);
        setLoading(false);
        console.error("Fetch booked seats error:", err);
      }
    };

    fetchBookedSeats();
  }, [showTimePlannerId]);

  const handleSeatSelect = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return; // Prevent selecting booked seats
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) return;
    setShowUserDetails(true);
  };

  const handleUserDetailsSubmit = (e) => {
    e.preventDefault();
    setShowUserDetails(false);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    navigate("/get-tickets", {
      state: {
        movie,
        timing,
        date,
        selectedSeats,
        totalPrice: selectedSeats.length * price,
        userDetails: formData,
        showTimeId,
        showTimePlannerId,
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-orange-100 pt-2 px-4">
      <NavigationButtons showHome={true} showBack={true} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto"
      >
        <h2 className="text-xl font-semibold text-black text-left ml-15 drop-shadow-lg">
          Select Your Seats
        </h2>

        {loading ? (
          <p>Loading seat data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Side - Seat Selection */}
            <div className="lg:w-2/3">
              {/* Seat Layout */}
              <SeatLayout
                selectedSeats={selectedSeats}
                bookedSeats={bookedSeats}
                onSeatSelect={handleSeatSelect}
              />

              {/* Screen Display */}
              <motion.div
                className="relative w-full h-8 flex justify-center items-end mt-4"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="w-[90%] h-10 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-[50%] shadow-2xl border-t-4 border-yellow-400 flex items-end justify-center">
                  <span className="text-orange-400 font-semibold text-sm sm:text-base md:text-md pb-1">
                    SCREEN
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Booking Summary */}
            <div className="lg:w-1/3 mb-4">
              <motion.div
                className="sticky top-4 p-6 bg-white bg-opacity-90 rounded-xl shadow-lg border border-orange-200 h-[50vh] lg:h-[84vh] flex flex-col"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-xl font-semibold text-orange-600 mb-4">
                  Booking Summary
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-600 font-semibold">Movie:</span>
                    <span className="ml-2 text-orange-600 block">
                      {movie?.title || "Unknown"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-semibold">Date:</span>
                    <span className="ml-2 text-orange-600 block">
                      {date || "Unknown"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-semibold">
                      Showtime:
                    </span>
                    <span className="ml-2 text-orange-600 block">
                      {timing || "Unknown"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-semibold">Seats:</span>
                    <div className="ml-2 text-orange-600 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100 pr-1">
                      {selectedSeats.length > 0 ? (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedSeats.map((seat, index) => (
                            <span
                              key={index}
                              className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm"
                            >
                              {seat}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="block">None selected</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 font-semibold">
                      Price per seat:
                    </span>
                    <span className="ml-2 text-orange-600 block">
                      ({selectedSeats.length}) x ₹{price || 0}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-gray-600 font-semibold">Total:</span>
                    <span className="ml-2 text-orange-600 text-xl font-bold block">
                      ₹{selectedSeats.length * (price || 0)}
                    </span>
                  </div>
                </div>

                <motion.button
                  className={`w-full mt-6 py-2 rounded-xl text-white text-lg font-semibold shadow-lg transition-all ${
                    selectedSeats.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700"
                  }`}
                  onClick={handleProceed}
                  disabled={selectedSeats.length === 0}
                  whileHover={selectedSeats.length > 0 ? { scale: 1.03 } : {}}
                  whileTap={selectedSeats.length > 0 ? { scale: 0.98 } : {}}
                >
                  Proceed to Book
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>

      {/* User Details Dialog */}
      <AnimatePresence>
        {showUserDetails && (
          <UserDetailsDialog
            formData={formData}
            handleChange={handleChange}
            handleUserDetailsSubmit={handleUserDetailsSubmit}
            onClose={() => setShowUserDetails(false)}
          />
        )}
      </AnimatePresence>

      {/* Payment Dialog */}
      <AnimatePresence>
        {showPayment && (
          <PaymentDialog
            selectedSeats={selectedSeats}
            seatPrice={price || 0}
            handlePaymentComplete={handlePaymentComplete}
            onClose={() => setShowPayment(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SeatSelection;
