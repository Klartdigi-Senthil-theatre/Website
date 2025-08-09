import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationButtons from "../components/NavigationButtons";
import SeatLayout from "../components/SeatLayout";
import UserDetailsDialog from "../dialog/UserDetailsDialog";
import api from "../services/api";
import { getAccessKey } from "../services/paymentGateway";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, timing, date, price, showTimeId, showTimePlannerId } =
    location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [currentSessionHolds, setCurrentSessionHolds] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch booked seats for the showTimePlannerId
  const fetchBookedSeats = useCallback(async () => {
    if (!showTimePlannerId) {
      setError("No showtime planner ID provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [bookingsResponse, holdsResponse] = await Promise.all([
        api.get(`/movie-seat-bookings/show-time-planner/${showTimePlannerId}`),
        api.get(`/movie-seat-holds/show-time-planner/${showTimePlannerId}`),
      ]);

      const booked = bookingsResponse.data.flatMap((booking) =>
        booking.seatNumber.map((seat) => seat.seatNo)
      );

      const held = holdsResponse.data.flatMap((hold) =>
        hold.seatNumbers.map((seat) => seat.seatNo)
      );

      setBookedSeats([...booked, ...held]);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch booked seats");
      setBookedSeats([]);
      setLoading(false);
      console.error("Fetch booked seats error:", err);
    }
  }, [showTimePlannerId]);

  useEffect(() => {
    fetchBookedSeats();
  }, [fetchBookedSeats]);

  useEffect(() => {
    if (!showUserDetails) {
      setPaymentLoading(false);
    }
  }, [showUserDetails]);

  const handleSeatSelect = (seatNumber) => {
    // Allow selection if:
    // 1. Seat is available OR
    // 2. Seat is held by current session
    const isSelectable =
      !bookedSeats.includes(seatNumber) ||
      currentSessionHolds.includes(seatNumber);

    if (!isSelectable) return;

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };
  const handleProceed = async () => {
    if (selectedSeats.length === 0) return;

    try {
      // Check if any selected seats are newly added (not in current holds)
      const newSeats = selectedSeats.filter(
        (seat) => !currentSessionHolds.includes(seat)
      );

      if (newSeats.length > 0) {
        await api.post("/movie-seat-holds", {
          movieId: movie.id,
          showTimePlannerId: showTimePlannerId,
          date: date,
          bookedSeats: newSeats,
        });
      }

      // Update current session holds
      setCurrentSessionHolds(selectedSeats);
      setShowUserDetails(true);
    } catch (err) {
      setError("Failed to hold seats. Some seats may have been taken.");
      // Refresh seat availability on error
      fetchBookedSeats();
      console.error("Seat hold error:", err);
    }
  };

  // Calculate disabled seats (excluding current session holds)
  const disabledSeats = bookedSeats.filter(
    (seat) => !currentSessionHolds.includes(seat)
  );

  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault();
    setShowUserDetails(false);
    setPaymentLoading(true);
    const totalPrice = selectedSeats.length * price;
    setFormData((prev) => ({ ...prev, totalPrice }));

    try {
      const createUser = await api.post("/users", {
        name: formData.name,
        emailId: formData.email,
        phoneNumber: formData.mobile,
      });

      const userId = createUser.data.id;

      getAccessKey(
        {
          amount: totalPrice,
          email: formData.email,
          name: formData.name,
          phone: formData.mobile,
          userId: userId,
          movieId: movie.id,
          showTimePlannerId: showTimePlannerId,
          date: date,
          selectedSeats: selectedSeats,
        },
        // Success callback
        () => {
          setPaymentLoading(false);
          handlePaymentComplete();
        },
        // Failure callback
        (errorMsg) => {
          setError(`Payment failed: ${errorMsg}`);
          setPaymentLoading(false);
        }
      );
    } catch (err) {
      setError("Failed to create user");
      setPaymentLoading(false);
      console.error("User creation error:", err);
    }
  };

  const handlePaymentComplete = () => {
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
                bookedSeats={disabledSeats}
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
            paymentLoading={paymentLoading}
            handleChange={handleChange}
            handleUserDetailsSubmit={handleUserDetailsSubmit}
            onClose={() => {
              setShowUserDetails(false);
              setPaymentLoading(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SeatSelection;
