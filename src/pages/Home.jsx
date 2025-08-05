// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import MovieCard from "../components/MovieCard";
import AdvertisementCarousel from "../components/AdvertisementCarousel";

const Home = () => {
  const navigate = useNavigate();
  // Initialize with Date object instead of string
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isHovering, setIsHovering] = useState(false);

  // Generate dates for next 7 days with proper month/year
  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        dateObj: date,
        day: date.toLocaleString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleString('en-US', { month: 'short' }),
        year: date.getFullYear()
      });
    }
    return dates;
  };

  const dates = getDates();

  const movies = [
    {
      id: 1,
      title: "Coolie",
      genre: "UA13+ • Action",
      language: "Tamil",
      poster: "/assets/images/movieFolder/coolie.jpg",
      timings: ["10:00 AM", "2:00 PM", "6:00 PM", "10:00 PM"],
    },
  ];

  const handleBookNow = (movieId, timing) => {
    const selectedMovie = movies.find((movie) => movie.id === movieId);
    navigate("/select-seats", {
      state: {
        movie: selectedMovie,
        timing,
        date: selectedDate.toLocaleDateString(),
      },
    });
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-gray-100 to-orange-200 transition-colors duration-300 ${isHovering ? 'bg-orange-100' : 'bg-white'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Advertisement Carousel */}
      <AdvertisementCarousel />

      {/* Date Selection - Left Aligned */}
      <div className="max-w-7xl mx-auto px-1 pt-2">
        <div className="flex flex-col space-y-2">

          {/* Date Selection */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center overflow-x-auto pb-2 scrollbar-hide space-x-4">

              <h3 className="text-md font-medium">Show Date:</h3>

              {/* Month and Year Display - Stacked */}
              <div className="flex flex-col items-center shrink-0 justify-center">
                <h3 className="text-sm text-orange-500 font-semibold">
                  {selectedDate.toLocaleString('default', { month: 'long' })}
                </h3>
                <h3 className="text-lg font-semibold">
                  {selectedDate.toLocaleString('default', { year: 'numeric' })}
                </h3>
              </div>

              {/* Date Buttons */}
              {dates.map((dateObj) => (
                <button
                  key={dateObj.date}
                  onClick={() => setSelectedDate(dateObj.dateObj)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all flex flex-col items-center ${selectedDate.toDateString() === dateObj.dateObj.toDateString()
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <div className="text-xs">{dateObj.day}</div>
                  <div className="font-bold">{dateObj.date}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Movie Cards */}
      <div className="max-w-7xl mx-auto p-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.005 }}
              className="w-full"
            >
              <MovieCard
                movie={movie}
                onBookNow={handleBookNow}
                selectedDate={selectedDate}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;