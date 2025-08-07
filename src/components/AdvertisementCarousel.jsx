// src/components/AdvertisementCarousel.jsx
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../services/api";

const AdvertisementCarousel = () => {
  const [ads, setAds] = useState([]);
  const [currentAd, setCurrentAd] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback image if no ads are available
  const fallbackImage = "/default-ad.jpg";

  // Fetch advertisements from API
  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        setLoading(true);
        const response = await api.get("/advertisements");
        const adsData = response.data;

        // Map API response to include only the image URL and title for alt text
        const formattedAds = adsData.map((ad) => ({
          image: ad.image || fallbackImage,
          title: ad.title || "Advertisement",
        }));

        setAds(formattedAds.length > 0 ? formattedAds : [{ image: fallbackImage, title: "Default Ad" }]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load advertisements");
        setAds([{ image: fallbackImage, title: "Default Ad" }]);
        setLoading(false);
        console.error("Advertisement fetch error:", err);
      }
    };

    fetchAdvertisements();
  }, []);

  // Auto-rotation for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ads.length]);

  return (
    <div className="flex flex-col items-center px-4 py-6">
      <div className="relative w-full max-w-7xl h-80 overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-gray-100">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p>Loading advertisements...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            {ads.map((ad, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: index === currentAd ? 1 : 0,
                  transition: { duration: 1 },
                }}
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover" // Changed to object-cover for better image scaling
                  onError={(e) => {
                    e.target.src = fallbackImage; // Fallback on image load error
                  }}
                />
              </motion.div>
            ))}

            {/* Left/Right Navigation Arrows */}
            <button
              onClick={() =>
                setCurrentAd((prev) => (prev - 1 + ads.length) % ads.length)
              }
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all shadow-md"
            >
              <ChevronLeft className="text-orange-500 w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentAd((prev) => (prev + 1) % ads.length)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all shadow-md"
            >
              <ChevronRight className="text-orange-500 w-6 h-6" />
            </button>
          </>
        )}
      </div>
      
      {/* Navigation Dots - Now outside the carousel */}
      {!loading && !error && (
        <div className="flex justify-center space-x-2 mt-4">
          {ads.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentAd(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentAd ? "bg-orange-500" : "bg-gray-300"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvertisementCarousel;