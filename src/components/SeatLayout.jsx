// src/components/SeatLayout.jsx
import { motion } from "framer-motion";

const SeatLayout = ({ selectedSeats, onSeatSelect }) => {
  // Define rows with their specific configurations
  const rows = [
    { letter: "A", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "B", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "C", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "D", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "E", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "F", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "G", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "H", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "I", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "J", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "K", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "L", leftSeats: 9, rightSeats: 11, hasGap: true }, // L1-L9 (left) | L10-L20 (right)
    { letter: "M", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "N", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "O", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "P", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "Q", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "R", leftSeats: 7, rightSeats: 8, hasGap: true },
  ];

  return (
    <motion.div
      className="w-full overflow-x-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="min-w-max flex flex-col gap-3 items-center px-4">
        {rows.map((row, rowIndex) => {
          // Generate left section seats (1 to leftSeats)
          const leftSeats = Array.from({ length: row.leftSeats }, (_, i) => ({
            number: i + 1,
            id: `${row.letter}${i + 1}`,
          }));

          // Generate right section seats - Special logic for row L
          let rightStart, rightSeats;
          if (row.letter === "L") {
            // For row L: right section starts at 10 and goes to 20
            rightStart = 10;
            rightSeats = Array.from({ length: row.rightSeats }, (_, i) => ({
              number: rightStart + i,
              id: `${row.letter}${rightStart + i}`,
            }));
          } else {
            // For other rows: normal logic
            rightStart = row.leftSeats + 1;
            rightSeats = Array.from({ length: row.rightSeats }, (_, i) => ({
              number: rightStart + i,
              id: `${row.letter}${rightStart + i}`,
            }));
          }

          return (
            <motion.div
              key={row.letter}
              className="flex gap-4 items-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: rowIndex * 0.05 }}
            >
              {/* Row label - Left */}
              <div className="w-8 text-center">
                <span className="text-slate-600 font-bold text-lg">
                  {row.letter}
                </span>
              </div>

              {/* Left section */}
              <div className="flex gap-1">
                {leftSeats.map((seat, seatIndex) => {
                  const isSelected = selectedSeats.includes(seat.id);
                  return (
                    <motion.button
                      key={seat.id}
                      className={`relative w-8 h-10 flex justify-center items-center rounded-t-xl rounded-b-sm font-bold text-xs border-2 transition-all duration-200 shadow-sm ${
                        isSelected
                          ? "bg-gradient-to-b from-orange-400 to-orange-600 text-white border-orange-700 shadow-lg scale-105"
                          : "bg-gradient-to-b from-orange-100 to-orange-200 text-orange-800 border-orange-300 hover:border-orange-500 hover:from-orange-200 hover:to-orange-300 hover:shadow-md"
                      }`}
                      onClick={() => onSeatSelect(seat.id)}
                      whileHover={{ scale: isSelected ? 1.05 : 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: rowIndex * 0.05 + seatIndex * 0.01 }}
                    >
                      <span className="relative z-10">{seat.number}</span>
                      {/* Seat cushion effect */}
                      <div
                        className={`absolute bottom-0 left-1 right-1 h-2 rounded-sm ${
                          isSelected ? "bg-orange-700" : "bg-orange-300"
                        }`}
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* Center aisle gap */}
              {row.hasGap && (
                <div className="w-12 flex justify-center items-center">
                  <div className="h-px w-8 bg-slate-300"></div>
                </div>
              )}

              {/* Right section */}
              <div className="flex gap-1">
                {rightSeats.map((seat, seatIndex) => {
                  const isSelected = selectedSeats.includes(seat.id);
                  return (
                    <motion.button
                      key={seat.id}
                      className={`relative w-8 h-10 flex justify-center items-center rounded-t-xl rounded-b-sm font-bold text-xs border-2 transition-all duration-200 shadow-sm ${
                        isSelected
                          ? "bg-gradient-to-b from-orange-400 to-orange-600 text-white border-orange-700 shadow-lg scale-105"
                          : "bg-gradient-to-b from-orange-100 to-orange-200 text-orange-800 border-orange-300 hover:border-orange-500 hover:from-orange-200 hover:to-orange-300 hover:shadow-md"
                      }`}
                      onClick={() => onSeatSelect(seat.id)}
                      whileHover={{ scale: isSelected ? 1.05 : 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay:
                          rowIndex * 0.05 +
                          (leftSeats.length + seatIndex) * 0.01,
                      }}
                    >
                      <span className="relative z-10">{seat.number}</span>
                      {/* Seat cushion effect */}
                      <div
                        className={`absolute bottom-0 left-1 right-1 h-2 rounded-sm ${
                          isSelected ? "bg-orange-700" : "bg-orange-300"
                        }`}
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* Row label - Right */}
              <div className="w-8 text-center">
                <span className="text-slate-600 font-bold text-lg">
                  {row.letter}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SeatLayout;
