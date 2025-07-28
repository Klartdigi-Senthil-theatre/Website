// src/components/MovieCard.jsx
import { motion } from "framer-motion";

const MovieCard = ({ movie, onBookNow, selectedDate }) => {
  const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
          <h3 className="font-semibold text-3xl text-orange-900">{movie.title}</h3>
          <p className="text-xs text-gray-600 mt-1">{movie.genre}</p>
          <p className="text-sm text-blue-600 font-medium mt-1">
            {movie.language}
          </p>
        </div>

        {/* Showtimes */}
        <div className="mt-4">
          <h4 className="text-md font-semibold text-orange-800 mb-2">
            {formattedDate}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {movie.timings.map((timing, index) => (
              <motion.button
                key={index}
                className="w-full py-2 bg-white border border-orange-500 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50 transition-all shadow-sm"
                onClick={() => onBookNow(movie.id, timing)}
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "#ffedd5",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {timing}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
