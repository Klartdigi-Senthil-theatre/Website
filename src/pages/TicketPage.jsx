// src/pages/TicketPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Download,
  Share2,
  Calendar,
  MapPin,
  Users,
  Ticket,
} from "lucide-react";
import Lottie from "lottie-react";
import Notification, { notify } from "../components/Notification";
import NavigationButtons from "../components/NavigationButtons";
import celebrationAnimation from "../assets/images/json/lottie.json";

const TicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showTicket, setShowTicket] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const { movieId, timing, selectedSeats, totalPrice, userDetails, bookingId } =
    location.state || {};

  useEffect(() => {
    // Show ticket animation after component mounts
    const timer = setTimeout(() => {
      setShowTicket(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    // Simulate download functionality
    notify.success("Ticket downloaded successfully!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Movie Ticket",
          text: `Check out my movie ticket for ${movieId}!`,
          url: window.location.href,
        })
        .catch(() => {
          notify.error("Sharing was cancelled");
        });
    } else {
      notify.info("Ticket shared successfully!");
    }
  };

  const ticketVariants = {
    hidden: {
      scale: 0,
      rotateY: 180,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotateY: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.2,
        delay: 0.3,
      },
    },
  };

  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20 px-4">
      <NavigationButtons showHome={true} showBack={false} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header with Lottie Animation */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="w-12 h-12">
              <Lottie
                animationData={celebrationAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Booking Confirmed!
            </h1>
          </div>
          <p className="text-md text-gray-600">Your movie tickets are ready</p>
        </motion.div>

        {/* Animated Ticket */}
        <AnimatePresence>
          {showTicket && (
            <motion.div
              variants={ticketVariants}
              initial="hidden"
              animate="visible"
              className="relative mb-4"
            >
              {/* Floating particles around ticket */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-orange-300 rounded-full"
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}

              {/* Main Ticket */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform perspective-1000 border border-gray-200">
                {/* Ticket Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10"></div>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10"
                  >
                    <motion.div
                      variants={fadeInUp}
                      className="flex justify-between items-start mb-4"
                    >
                      <div>
                        <h2 className="text-xl font-bold mb-1">
                          {movieId || "Movie Title"}
                        </h2>
                        <p className="text-md text-orange-100">
                          Cinema Experience
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="bg-white bg-opacity-20 p-2 rounded-full"
                      >
                        <Ticket className="w-6 h-6" />
                      </motion.div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="text-right">
                      <div className="text-sm opacity-80">Booking ID</div>
                      <div className="font-mono text-lg font-bold">
                        {bookingId}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Decorative perforations */}
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-white">
                    <div className="flex justify-between px-2">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-orange-500 rounded-full transform translate-y-1"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ticket Body */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="p-6 bg-white"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <motion.div
                        variants={fadeInUp}
                        className="flex items-center gap-3"
                      >
                        <Calendar className="w-5 h-5 text-orange-500" />
                        <div>
                          <div className="text-sm text-gray-500">
                            Date & Time
                          </div>
                          <div className="font-medium">
                            {new Date().toLocaleDateString()} • {timing}
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="flex items-center gap-3"
                      >
                        <Users className="w-5 h-5 text-orange-500" />
                        <div>
                          <div className="text-sm text-gray-500">Seats</div>
                          <div className="font-medium">
                            {selectedSeats?.join(", ")}
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="flex items-center gap-3"
                      >
                        <MapPin className="w-5 h-5 text-orange-500" />
                        <div>
                          <div className="text-sm text-gray-500">Theatre</div>
                          <div className="font-medium">XYZ Theatre</div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <motion.div variants={fadeInUp} className="text-right">
                        <div className="text-sm text-gray-500">
                          Total Amount
                        </div>
                        <div className="text-3xl font-medium text-orange-600">
                          ₹{totalPrice}
                        </div>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <div className="text-sm text-gray-500 mb-2">
                          Customer Details
                        </div>
                        <div className="font-medium">{userDetails?.name}</div>
                        <div className="text-sm text-gray-600">
                          {userDetails?.email}
                        </div>
                        <div className="text-sm text-gray-600">
                          {userDetails?.mobile}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* QR Code Section */}
                  <motion.div
                    variants={fadeInUp}
                    className="mt-6 pt-6 border-t border-gray-200 text-center"
                  >
                    <motion.button
                      onClick={() => setShowQR(!showQR)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <QrCode className="w-5 h-5" />
                      {showQR ? "Hide QR Code" : "Show QR Code"}
                    </motion.button>

                    <AnimatePresence>
                      {showQR && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4"
                        >
                          <div className="w-32 h-32 bg-gray-200 mx-auto rounded-lg flex items-center justify-center">
                            <QrCode className="w-16 h-16 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Scan at theatre entrance
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:bg-orange-600"
          >
            <Download className="w-5 h-5" />
            Download Ticket
          </motion.button>

          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Share2 className="w-5 h-5" />
            Share Ticket
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-gray-600 mb-8"
        >
          <p className="mb-2">🍿 Enjoy your movie experience! 🎬</p>
          <p className="text-sm opacity-75">
            Please arrive 15 minutes before showtime
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-300 rounded-full opacity-40"
              animate={{
                x: [0, Math.random() * window.innerWidth],
                y: [window.innerHeight, -100],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
              style={{
                left: Math.random() * window.innerWidth,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TicketPage;
