import { motion } from "framer-motion";

const SeatLayout = ({ selectedSeats, bookedSeats, onSeatSelect }) => {
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
    { letter: "L", leftSeats: 9, rightSeats: 9, hasGap: true, hasEntry: true }, // L1-L9 (left) | L10-L20 (right)
    { letter: "M", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "N", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "O", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "P", leftSeats: 10, rightSeats: 10, hasGap: true },
    { letter: "Q", leftSeats: 10, rightSeats: 10, hasGap: true },
    {
      letter: "R",
      leftSeats: 7,
      rightSeats: 8,
      hasGap: true,
      centerAlign: true,
    },
  ];

  return (
    <motion.div
      className="w-full overflow-x-auto py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="min-w-max flex flex-col gap-1 items-center px-4">
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
              <div className="w-6 text-center">
                <span className="text-slate-600 font-bold text-lg">
                  {row.letter}
                </span>
              </div>

              {/* Left section */}
              <div className={`flex gap-1 ${row.centerAlign ? "pl-9" : ""}`}>
                {/* Entry indicator for L row */}
                {row.hasEntry && (
                  <div className="w-7 h-6 rotate-90 flex items-center justify-center rounded text-[8px] tracking-wide font-bold">
                    ENTRY
                  </div>
                )}

                {leftSeats.map((seat, seatIndex) => {
                  const isSelected = selectedSeats.includes(seat.id);
                  const isBooked = bookedSeats.includes(seat.id);
                  return (
                    <motion.button
                      key={seat.id}
                      className={`relative w-6 h-6 flex justify-center items-center rounded-t-xl rounded-b-sm font-bold text-xs border-2 transition-all duration-200 shadow-sm ${
                        isBooked
                          ? "bg-gradient-to-b from-gray-300 to-gray-400 text-white border-gray-500 cursor-not-allowed"
                          : isSelected
                          ? "bg-gradient-to-b from-orange-400 to-orange-600 text-white border-orange-700 shadow-lg scale-105"
                          : "bg-gradient-to-b from-orange-100 to-orange-200 text-orange-800 border-orange-300 hover:border-orange-500 hover:from-orange-200 hover:to-orange-300 hover:shadow-md"
                      }`}
                      onClick={() => !isBooked && onSeatSelect(seat.id)}
                      disabled={isBooked}
                      whileHover={{
                        scale: isBooked ? 1 : isSelected ? 1.05 : 1.1,
                      }}
                      whileTap={{ scale: isBooked ? 1 : 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: rowIndex * 0.05 + seatIndex * 0.01 }}
                    >
                      <span className="relative z-10">{seat.number}</span>
                      {/* Seat cushion effect */}
                      <div
                        className={`absolute bottom-0 left-1 right-1 h-2 rounded-sm ${
                          isBooked
                            ? "bg-gray-500"
                            : isSelected
                            ? "bg-orange-700"
                            : "bg-orange-300"
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
              <div className={`flex gap-1 ${row.centerAlign ? "pr-3" : ""}`}>
                {rightSeats.map((seat, seatIndex) => {
                  const isSelected = selectedSeats.includes(seat.id);
                  const isBooked = bookedSeats.includes(seat.id);
                  return (
                    <motion.button
                      key={seat.id}
                      className={`relative w-6 h-6 flex justify-center items-center rounded-t-xl rounded-b-sm font-bold text-xs border-2 transition-all duration-200 shadow-sm ${
                        isBooked
                          ? "bg-gradient-to-b from-gray-300 to-gray-400 text-white border-gray-500 cursor-not-allowed"
                          : isSelected
                          ? "bg-gradient-to-b from-orange-400 to-orange-600 text-white border-orange-700 shadow-lg scale-105"
                          : "bg-gradient-to-b from-orange-100 to-orange-200 text-orange-800 border-orange-300 hover:border-orange-500 hover:from-orange-200 hover:to-orange-300 hover:shadow-md"
                      }`}
                      onClick={() => !isBooked && onSeatSelect(seat.id)}
                      disabled={isBooked}
                      whileHover={{
                        scale: isBooked ? 1 : isSelected ? 1.05 : 1.1,
                      }}
                      whileTap={{ scale: isBooked ? 1 : 0.95 }}
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
                          isBooked
                            ? "bg-gray-500"
                            : isSelected
                            ? "bg-orange-700"
                            : "bg-orange-300"
                        }`}
                      />
                    </motion.button>
                  );
                })}

                {/* Exit indicator for L row */}
                {row.hasEntry && (
                  <div className="w-7 h-6 flex rotate-270 items-center justify-center rounded text-[8px] tracking-widest font-bold">
                    EXIT
                  </div>
                )}
              </div>

              {/* Row label - Right */}
              <div className="w-6 text-center">
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
