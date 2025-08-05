import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const AdvertisementCarousel = () => {
  const ads = [
    "/assets/images/advertisements/adv1.jpg",
    "/assets/images/advertisements/adv4.jpg",
    "/assets/images/advertisements/adv2.jpg",
    "/assets/images/advertisements/adv3.jpg",
  ];
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ads.length]);

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="relative w-full max-w-7xl h-64 overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-gray-100">
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
              src={ad}
              alt={`Advertisement ${index + 1}`}
              className="w-full h-full object-fill"
            />
          </motion.div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {ads.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentAd(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentAd ? "bg-white" : "bg-gray-300"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

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
      </div>
    </div>
  );
};

export default AdvertisementCarousel;
