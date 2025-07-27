// src/components/NavigationButtons.jsx
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useState } from "react";

const NavigationButtons = ({ showBack = true, showHome = true }) => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Hide buttons when scrolling down, show when scrolling up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      className={`fixed top-4 left-4 z-50 flex gap-2`}
      animate={{
        y: hidden ? -100 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
    >
      {/* {showBack && (
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white bg-opacity-90 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg text-orange-600 font-medium hover:bg-opacity-100 transition-all text-sm md:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={18} className="md:size-5" />
          <span className="hidden sm:inline">Back</span>
        </motion.button>
      )} */}

      {showHome && (
        <motion.button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-white bg-opacity-90 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg text-orange-600 font-medium hover:bg-opacity-100 transition-all text-sm md:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home size={18} className="md:size-5" />
          <span className="hidden sm:inline">Home</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default NavigationButtons;
