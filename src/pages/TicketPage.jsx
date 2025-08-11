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
import { notify } from "../components/Notification";
import NavigationButtons from "../components/NavigationButtons";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import celebrationAnimation from "../assets/lottie.json";
const TicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showTicket, setShowTicket] = useState(false);

  const { movie, timing, selectedSeats, totalPrice, userDetails, bookingId, date } =
    location.state || {};

  // Calculate price per seat (assuming equal distribution for simplicity)
  const pricePerSeat = selectedSeats ? totalPrice / selectedSeats.length : 0;

  const qrCodeData = `Movie: ${movie?.title || "Movie Title"}\nDate: ${date || new Date().toLocaleDateString()}\nTime: ${timing}\nSeats: ${selectedSeats?.join(
    ", "
  )}\nBooking ID: ${bookingId}\nAmount: ₹${totalPrice}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTicket(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const generateQRCodeURL = (data) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      data
    )}`;
  };

  const handleDownload = async () => {
    try {
      notify.info("Generating PDF... Please wait");

      // Create a new PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const margin = 10;
      const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;

      // Sort seats properly (handles both letters and numbers like A1, A2, B1, B2 etc.)
      const sortedSeats = [...selectedSeats].sort((a, b) => {
        // Extract row letter and seat number
        const matchA = a.match(/([A-Z]+)(\d+)/);
        const matchB = b.match(/([A-Z]+)(\d+)/);
        
        if (matchA && matchB) {
          const [, rowA, numA] = matchA;
          const [, rowB, numB] = matchB;
          
          // First compare by row letter
          if (rowA !== rowB) {
            return rowA.localeCompare(rowB);
          }
          // Then compare by seat number
          return parseInt(numA) - parseInt(numB);
        }
        
        // Fallback to string comparison
        return a.localeCompare(b);
      });

      // Generate individual tickets for each seat
      for (let i = 0; i < sortedSeats.length; i++) {
        if (i > 0) pdf.addPage(); // Add new page for each ticket after the first

        const seat = sortedSeats[i];
        const seatPrice = pricePerSeat;

        const ticketElement = document.createElement("div");
        ticketElement.className =
          "bg-white rounded-xl shadow-lg p-4 w-full max-w-md mx-auto mb-4 border border-gray-200";
        ticketElement.innerHTML = `
                     <div style="background: #000000; padding: 24px; color: white; border-radius: 12px 12px 0 0; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div style="flex: 1;">
                <h2 style="font-size: 18px; font-weight: bold; margin: 0 0 2px 0; line-height: 1.2;">${movie?.title || "Movie Title"}</h2>
                <p style="font-size: 11px; opacity: 0.8; margin: 0 0 6px 0;">Cinema Experience</p>
                <div style="margin-top: 6px;">
                  <span style="font-size: 10px; opacity: 0.8;">Booking ID: </span>
                  <span style="font-family: monospace; font-weight: bold; font-size: 11px;">${bookingId}</span>
                </div>
              </div>
              <div style="background: white; padding: 2px; border-radius: 50%; width: 22%; height: 0; padding-bottom: 22%; position: relative; overflow: hidden;">
                <img src="${movie?.poster || "/logo.webp"}" alt="Movie Poster" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: calc(100% - 4px); height: calc(100% - 4px); object-fit: cover; border-radius: 50%;" />
              </div>
            </div>
                         <!-- Decorative perforations -->
             <div style="position: absolute; bottom: -8px; left: 0; right: 0; height: 16px; background: white; display: flex; justify-content: space-between; align-items: center; padding: 0 8px;">
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
               <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
             </div>
          </div>
          <div style="padding: 24px; background: white;">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="space-y-4">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p class="text-xs text-gray-500">Date & Time</p>
                    <p style="font-size: 11px; font-weight: 500;">${date || new Date().toLocaleDateString()} • ${timing}</p>
                  </div>
                </div>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />

                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 616 0z" />
                  </svg>
                  <div>
                    <p class="text-xs text-gray-500">Theatre</p>
                    <p style="font-size: 11px; font-weight: 500;">Senthil Cinema</p>
                    <p style="font-size: 8px; color: #6b7280; margin-top: 2px;">GST IN: 33CMMPP7822B1Z2</p>
                  </div>
                </div>
              </div>
              <div class="space-y-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                  </svg>
                  <div>
                    <p class="text-xs text-gray-500">Seat</p>
                    <p style="font-size: 11px; font-weight: 500;">${seat}</p>
                  </div>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Amount</p>
                  <p class="text-lg font-bold text-orange-600">₹${seatPrice.toFixed(
                    2
                  )}</p>
                </div>
              </div>
            </div>
            
            <div style="display: flex; justify-content: flex-start; align-items: flex-start; gap: 6px; width: 100%;">
              <div style="flex-shrink: 0;">
                <div style="width: 120px; height: 120px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 2px solid #e5e7eb;">
                  <img src="${generateQRCodeURL(
                    qrCodeData
                  )}" alt="QR Code" style="width: 100%; height: 100%; object-fit: contain;" />
                </div>
                <p style="text-align: center; font-size: 9px; color: #6b7280; margin: 8px 0 0 0; width: 120px;">Scan at theatre entrance</p>
              </div>
              <div style="flex: 1; width: 100%;">
                <div style="padding: 12px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb; width: 100%; box-sizing: border-box; height: 120px; display: flex; flex-direction: column; justify-content: center;">
                  <p style="font-size: 13px; color: #6b7280; margin: 0 0 8px 0; font-weight: 500;">Customer Details</p>
                  <p style="font-size: 14px; margin: 0; color: #374151; font-weight: 600;">${userDetails?.name}</p>
                  <p style="font-size: 11px; margin: 4px 0 0 0; color: #374151;">${userDetails?.email || 'N/A'}</p>
                  <p style="font-size: 11px; margin: 4px 0 0 0; color: #374151;">${userDetails?.mobile || 'N/A'}</p>
                </div>
              </div>
            </div>
            
            <!-- Footer Notice -->
            <div style="margin-top: 20px; padding: 12px; background: #fef9e7; border-radius: 6px; border-left: 4px solid #f59e0b;">
              <p style="font-size: 9px; color: #92400e; margin: 0; font-weight: 500;">📢 Please arrive 15 minutes before showtime. Carry a valid ID proof.</p>
            </div>
          </div>
        `;

        // Append to body temporarily
        document.body.appendChild(ticketElement);

        // Generate canvas from the ticket
        const canvas = await html2canvas(ticketElement, {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          width: ticketElement.offsetWidth,
          height: ticketElement.offsetHeight,
          dpi: 300,
          quality: 1,
        });

        // Remove from body
        document.body.removeChild(ticketElement);

        // Calculate dimensions
        const aspectRatio = canvas.width / canvas.height;
        const imgWidth = pageWidth;
        const imgHeight = imgWidth / aspectRatio;

        // Add to PDF
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          margin,
          margin,
          imgWidth,
          imgHeight
        );
      }

      // Save the PDF
      const fileName = `MovieTickets_${bookingId}_${(date || new Date().toLocaleDateString())
        .replace(/\//g, "-")}.pdf`;
      pdf.save(fileName);

      notify.success("Tickets downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      notify.error("Failed to download tickets. Please try again.");
    }
  };

  const handleShare = () => {
    const shareText = `🎬✨ MOVIE TICKET BOOKING CONFIRMED ✨🎬

━━━━━━━━━━━━━━━━━━━━━━━━━
MOVIE: ${movie?.title || "Movie Title"}
THEATRE: Senthil Cinema
━━━━━━━━━━━━━━━━━━━━━━━━━

📋 BOOKING DETAILS:
* Booking ID: ${bookingId}
* Date: ${date || new Date().toLocaleDateString()}
* Show Time: ${timing}
* Seats: ${selectedSeats?.join(", ")}
* Customer: ${userDetails?.name}

💰 PAYMENT SUMMARY:
* Total Amount: ₹${totalPrice}
* Seats: ${selectedSeats?.length} × ₹${pricePerSeat.toFixed(2)}

━━━━━━━━━━━━━━━━━━━━━━━━━
📱 IMPORTANT NOTES:
* Please arrive 15 minutes before showtime
* Carry a valid ID for verification
* Show this ticket at the theatre entrance

🍿 Enjoy your movie experience! 🎬

(powered by Senthil Cinema)`;

    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    if (
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.open(whatsappURL, "_blank");
    } else {
      window.open(
        `https://web.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
        "_blank"
      );
    }
    notify.success("Opening WhatsApp to share your ticket!");
  };

  const ticketVariants = {
    hidden: { scale: 0, rotateY: 180, opacity: 0 },
    visible: {
      scale: 1,
      rotateY: 0,
      opacity: 1,
      transition: { type: "spring", duration: 1.2, delay: 0.3 },
    },
  };

  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-white pt-8 md:pt-12 px-4">
      <NavigationButtons showHome={true} showBack={false} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <div className="flex justify-center items-center gap-1">
            <div className="w-10 h-10">
              <Lottie
                animationData={celebrationAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">
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
              className="relative mb-2"
              id="ticket-container"
            >
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
                      className="flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h2 className="text-xl font-bold mb-2">
                          {movie?.title || "Movie Title"}
                        </h2>
                        <p className="text-sm text-orange-100 mb-2">
                          Cinema Experience
                        </p>
                        <div className="text-xs flex items-center gap-2 pb-2">
                          <span className="opacity-80">Booking ID:</span>
                          <span className="font-mono text-xs font-bold text-white opacity-100">
                            ST- {bookingId}
                          </span>
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 overflow-hidden" style={{ padding: '2px' }}>
                        <img 
                          src={movie?.poster || "/logo.webp"} 
                          alt="Movie Poster" 
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover rounded-full"
                          style={{ width: 'calc(100% - 4px)', height: 'calc(100% - 4px)' }}
                        />
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
                            {date || new Date().toLocaleDateString()} • {timing}
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
                          <div className="font-medium">Senthil Cinema</div>
                          <div className="text-xs text-gray-400">GST IN: 33CMMPP7822B1Z2</div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* QR Code and Price Section */}
                      <motion.div
                        variants={fadeInUp}
                        className="flex justify-between items-center mt-2 pt-4 border-t border-gray-200"
                      >
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={generateQRCodeURL(qrCodeData)}
                            alt="QR Code"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-full h-full hidden items-center justify-center">
                            <QrCode className="w-12 h-12 text-gray-400" />
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            Total Amount
                          </div>
                          <div className="text-2xl font-bold text-orange-600">
                            ₹{totalPrice}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {selectedSeats?.length} seat(s) × ₹
                            {pricePerSeat.toFixed(2)}
                          </div>
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
          className="flex flex-col sm:flex-row gap-4 justify-center mb-4"
        >
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:bg-orange-600"
          >
            <Download className="w-5 h-5" />
            Download Tickets
          </motion.button>

          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Share2 className="w-5 h-5" />
            Share Tickets
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
      </motion.div>
    </div>
  );
};

export default TicketPage;
