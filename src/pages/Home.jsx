import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import AdvertisementCarousel from "../components/AdvertisementCarousel";
import api from "../services/api";

const Home = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today (2025-08-07 in IST)
    const [isHovering, setIsHovering] = useState(false);
    const [movies, setMovies] = useState([]);
    const [showtimeData, setShowtimeData] = useState([]); // Store raw showtime data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalResolve, setModalResolve] = useState(null);

    const confirmAdultContent = () => {
        return new Promise((resolve) => {
            setModalResolve(() => resolve);
            setShowModal(true);
        });
    };

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [showModal]);

    // Generate dates for the next 7 days
    const getDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push({
                dateObj: date,
                day: date.toLocaleString("en-US", { weekday: "short" }),
                date: date.getDate(),
                month: date.toLocaleString("en-US", { month: "short" }),
                year: date.getFullYear(),
            });
        }
        return dates;
    };

    const dates = getDates();

    // Fetch showtime planner data for the selected date
    const fetchShowtimePlanner = async () => {
        try {
            setLoading(true);
            // Format selectedDate as YYYY-MM-DD in IST
            const formattedDate = selectedDate
                .toLocaleDateString("en-CA", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                })
                .split("/")
                .reverse()
                .join("-"); // e.g., "2025-08-07"

            const response = await api.get(
                `/show-time-planner/date/${formattedDate}`
            );
            const showtimeData = response.data;
            setShowtimeData(showtimeData);

            // Group showtimes by movieId
            const moviesMap = new Map();
            showtimeData.forEach((entry) => {
                // Skip inactive or invalid entries
                if (!entry.active || !entry.movie || !entry.showTime) {
                    console.warn(`Skipping invalid entry: ${JSON.stringify(entry)}`);
                    return;
                }

                const movieId = entry.movieId;
                // Initialize movie entry if it doesn't exist
                if (!moviesMap.has(movieId)) {
                    moviesMap.set(movieId, {
                        id: movieId,
                        title: entry.movie.movieName,
                        genre: entry.movie.genre || "Not specified", // Fallback for missing genre
                        language: entry.movie.language || "Not specified",
                        poster: entry.movie.image || "/default-poster.jpg",
                        certificate: entry.movie.certificate || "Not specified",
                        duration: entry.movie.duration || 0,
                        timings: [],
                        prices: new Map(), // Map showTimeId to price
                    });
                }

                // Add showtime to the movie's timings and prices
                const movie = moviesMap.get(movieId);

                // Handle both formats: "14:00" or "2023-10-05 10:00:00"
                const rawShowTime = entry.showTime.showTime;
                let showTimeStr = rawShowTime;
                // if (rawShowTime.includes(" ")) {
                //     // Format: "2023-10-05 10:00:00" - split and take time part
                //     showTimeStr = rawShowTime.split(" ")[1];
                // } else {
                //     // Format: "14:00" - use as is
                //     showTimeStr = rawShowTime;
                // }

                if (showTimeStr) {
                    // const [hours, minutes] = showTimeStr.split(":").map(Number);
                    // const showTime = new Date();
                    // showTime.setHours(hours, minutes);
                    // if (!isNaN(showTime.getTime())) {
                    // const timeString = showTime.toLocaleTimeString("en-US", {
                    //     hour: "numeric",
                    //     minute: "2-digit",
                    // });
                    movie.timings.push(showTimeStr);
                    movie.prices.set(entry.showTimeId, entry.price);
                    // } else {
                    //     console.warn(
                    //         `Invalid showTime for showTimeId ${entry.showTimeId}: ${rawShowTime}`
                    //     );
                    // }
                }
            });

            // Convert Map to array and filter out movies with no timings
            const formattedMovies = Array.from(moviesMap.values())
                .filter((movie) => movie.timings.length > 0)
                .map((movie) => ({
                    ...movie,
                    // Sort timings chronologically
                    timings: movie.timings.sort((a, b) => {
                        // Convert time strings back to Date objects for proper comparison
                        const parseTime = (timeStr) => {
                            const [time, period] = timeStr.split(" ");
                            const [hours, minutes] = time.split(":").map(Number);
                            let hour24 = hours;

                            if (period === "PM" && hours !== 12) {
                                hour24 += 12;
                            } else if (period === "AM" && hours === 12) {
                                hour24 = 0;
                            }

                            return hour24 * 60 + minutes; // Convert to minutes for easy comparison
                        };

                        return parseTime(a) - parseTime(b);
                    }),
                }));

            setMovies(formattedMovies);
            setLoading(false);
        } catch (err) {
            if (err.response?.status === 400) {
                setError("Invalid date format");
            } else if (err.response?.status === 404) {
                setError("No showtimes available for the selected date");
            } else {
                setError("Failed to fetch showtimes");
            }
            setMovies([]);
            setLoading(false);
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchShowtimePlanner();
    }, [selectedDate]);

    const handleBookNow = async (movieId, timing) => {
        const selectedMovie = movies.find((movie) => movie.id === movieId);
        if (!selectedMovie) {
            console.error(`Movie not found for movieId ${movieId}`);
            return;
        }

        const showTimeEntry = showtimeData.find((entry) => {
            if (!entry.showTime || !entry.active || entry.movieId !== movieId)
                return false;

            // Handle both formats: "14:00" or "2023-10-05 10:00:00"
            const rawShowTime = entry.showTime.showTime;
            let showTimeStr = rawShowTime;

            // if (rawShowTime.includes(" ")) {
            //     // Format: "2023-10-05 10:00:00" - split and take time part
            //     showTimeStr = rawShowTime.split(" ")[1];
            // } else {
            //     // Format: "14:00" - use as is
            //     showTimeStr = rawShowTime;
            // }


            // if (!showTimeStr) return false;
            // const [hours, minutes] = showTimeStr.split(":").map(Number);
            // const showTime = new Date();
            // showTime.setHours(hours, minutes);
            return (
                showTimeStr === timing
            );
        });

        if (!showTimeEntry) {
            console.error(
                `No showtime found for movieId ${movieId} and timing ${timing}`
            );
            return;
        }

        if (showTimeEntry.movie.certificate === "A") {
            const proceed = await confirmAdultContent();
            if (!proceed) return;
        }

        navigate("/select-seats", {
            state: {
                movie: selectedMovie,
                timing,
                date: selectedDate.toISOString(),
                price: showTimeEntry.price,
                showTimeId: showTimeEntry.showTimeId,
                showTimePlannerId: showTimeEntry.id,
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
            className={`min-h-screen bg-gradient-to-b from-gray-100 to-orange-200 transition-colors duration-300 ${isHovering ? "bg-orange-100" : "bg-white"
                }`}
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
                                    {selectedDate.toLocaleString("default", { month: "long" })}
                                </h3>
                                <h3 className="text-lg font-semibold">
                                    {selectedDate.toLocaleString("default", { year: "numeric" })}
                                </h3>
                            </div>

                            {/* Date Buttons */}
                            {dates.map((dateObj) => (
                                <button
                                    key={`${dateObj.date}-${dateObj.month}-${dateObj.year}`}
                                    onClick={() => setSelectedDate(dateObj.dateObj)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all flex flex-col items-center ${selectedDate.toDateString() ===
                                        dateObj.dateObj.toDateString()
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
                {loading ? (
                    <p>Loading movies...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : movies.length === 0 ? (
                    <div>
                        <p>No movies available for the selected date.</p>
                    </div>
                ) : (
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
                )}
            </div>

            {showModal && (
                <div
                    className="fixed inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center z-50"
                    onClick={() => {
                        setShowModal(false);
                        modalResolve(false);
                    }}
                >
                    <div
                        className="bg-gradient-to-b from-gray-100 to-orange-200 rounded-xl shadow-xl p-4 sm:p-6 relative w-[90%] max-w-md mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => {
                                setShowModal(false);
                                modalResolve(false);
                            }}
                            className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl cursor-pointer"
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <h2 className="text-lg sm:text-xl font-bold text-orange-500 mb-3 sm:mb-4 text-center">
                            Content Warning
                        </h2>

                        <p className="text-sm sm:text-base mb-5 text-gray-800 leading-relaxed text-center">
                            This movie is rated <strong>"A"</strong> and is only for viewers above 18.
                            Please carry a valid ID/Age Proof to the theatre. If you are denied entry due
                            to age or ID issues, you will not get a refund.
                        </p>

                        <button
                            onClick={() => {
                                setShowModal(false);
                                modalResolve(true);
                            }}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 sm:py-3 rounded-lg w-full text-sm sm:text-base font-medium transition-colors cursor-pointer"
                        >
                            Continue
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Home;
