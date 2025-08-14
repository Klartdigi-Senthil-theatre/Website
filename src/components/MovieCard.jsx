// src/components/MovieCard.jsx
import { motion } from "framer-motion";

const MovieCard = ({ movie, onBookNow, selectedDate }) => {
  const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Function to check if a showtime has passed
  const isShowtimePassed = (timing) => {
    const selectedDateObj = new Date(selectedDate);
    const today = new Date();
    
    // Only check if the selected date is today
    if (selectedDateObj.toDateString() !== today.toDateString()) {
      return false; // If it's not today, showtime hasn't passed
    }

    // Parse the timing string (e.g., "10:30 AM" or "2:30 PM")
    const timeString = timing.trim();
    const timeParts = timeString.split(' ');
    
    if (timeParts.length !== 2) {
      return false; // Invalid format, don't disable
    }

    const [time, period] = timeParts;
    const [hours, minutes] = time.split(':').map(Number);
    
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hours === 12) {
      hour24 = 0;
    }

    // Create a Date object for the showtime
    const showtimeDate = new Date();
    showtimeDate.setHours(hour24, minutes, 0, 0);

    // Compare with current time
    return today.getTime() > showtimeDate.getTime();
  };

  return (
    <div className="w-full flex flex-col sm:flex-row py-4">
      {/* Left: Movie Poster */}
      <div className="w-full sm:w-[35%] p-2 flex justify-center items-center">
        <motion.img
          src={movie.poster}
          alt={movie.title}
          className="w-60 h-65 object-cover rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>

      {/* Right: Movie Info and Showtimes */}
      <div className="w-full sm:w-[65%] flex flex-col justify-between p-4">
        {/* Movie Info */}
        <div>
          <h3 className="font-semibold text-3xl text-orange-900">
            {movie.title}
          </h3>
          <p className="text-xs text-gray-600 mt-1">{movie.certificate}</p>
          <p className="text-sm text-blue-600 font-medium mt-1">
            {movie.language}
          </p>
        </div>

        {/* Showtimes */}
        <div>
          <h4 className="text-md font-semibold text-orange-800 mb-2">
            {formattedDate}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {movie.timings.map((timing, index) => {
              const isPassed = isShowtimePassed(timing);
              return (
                <motion.button
                  key={index}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
                    isPassed
                      ? "bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 text-gray-400 cursor-not-allowed opacity-75"
                      : "bg-white border border-orange-500 text-orange-600 hover:bg-orange-50"
                  }`}
                  onClick={() => !isPassed && onBookNow(movie.id, timing)}
                  disabled={isPassed}
                  whileHover={
                    !isPassed
                      ? {
                          scale: 1.03,
                          backgroundColor: "#ffedd5",
                        }
                      : {}
                  }
                  whileTap={!isPassed ? { scale: 0.98 } : {}}
                                  >
                  {timing}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
