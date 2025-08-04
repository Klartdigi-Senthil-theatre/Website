import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, X, QrCode } from "lucide-react";

const PaymentDialog = ({
    selectedSeats,
    seatPrice,
    handlePaymentComplete,
    onClose,
}) => {
    const [paymentMethod, setPaymentMethod] = useState("qr"); // "qr" or "card"

    const totalAmount = selectedSeats.length * seatPrice;

    return (
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        className="fixed inset-0 bg-black/30 bg-opacity-20 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white/90 backdrop-blur-lg rounded-xl p-6 max-w-md w-full shadow-2xl border border-white/20"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-semibold text-orange-900 flex items-center gap-2">
              <CheckCircle className="text-green-500" size={24} />
              Payment
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Summary */}
          <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200 mb-4">
            <h3 className="font-medium text-orange-900">
              Selected Seats: {selectedSeats.join(", ")}
            </h3>
            <h3 className="font-medium text-orange-900">
              Total Price: ₹{totalAmount}
            </h3>
          </div>

          {/* Payment Method Selector */}
          <div className="mb-4 flex justify-between items-center">
            <button
              onClick={() => setPaymentMethod("qr")}
              className={`w-1/2 py-2 rounded-l-lg font-medium border border-orange-400 ${
                paymentMethod === "qr"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-700"
              }`}
            >
              QR Code
            </button>
            <button
              onClick={() => setPaymentMethod("card")}
              className={`w-1/2 py-2 rounded-r-lg font-medium border border-orange-400 ${
                paymentMethod === "card"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-700"
              }`}
            >
              Credit / Debit Card
            </button>
          </div>

          {/* QR Code Payment UI */}
          {paymentMethod === "qr" && (
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?amount=100&size=150x150"
                  alt="QR Code"
                  className="mx-auto w-40 h-40"
                />
                <p className="text-sm text-gray-700 mt-2">
                  Scan this QR with any UPI app to pay ₹{totalAmount}
                </p>
              </div>
              <button
                onClick={handlePaymentComplete}
                className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                I've Paid
              </button>
            </div>
          )}

          {/* Card Payment UI */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-orange-900">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="p-2 border-2 border-orange-200 rounded-lg focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-orange-900">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="p-2 border-2 border-orange-200 rounded-lg focus:border-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-orange-900">CVV</label>
                  <input
                    type="password"
                    placeholder="123"
                    className="p-2 border-2 border-orange-200 rounded-lg focus:border-orange-500"
                  />
                </div>
              </div>

              <button
                onClick={handlePaymentComplete}
                className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Complete Payment
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
};

export default PaymentDialog;

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, X, QrCode } from "lucide-react";

const PaymentDialog = ({
    selectedSeats,
    seatPrice,
    handlePaymentComplete,
    onClose,
}) => {
    const [paymentMethod, setPaymentMethod] = useState("qr"); // "qr" or "card"

    const totalAmount = selectedSeats.length * seatPrice;

    return (
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        className="fixed inset-0 bg-black/30 bg-opacity-20 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white/90 backdrop-blur-lg rounded-xl p-6 max-w-md w-full shadow-2xl border border-white/20"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-semibold text-orange-900 flex items-center gap-2">
              <CheckCircle className="text-green-500" size={24} />
              Payment
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Summary */}
          <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200 mb-4">
            <h3 className="font-medium text-orange-900">
              Selected Seats: {selectedSeats.join(", ")}
            </h3>
            <h3 className="font-medium text-orange-900">
              Total Price: ₹{totalAmount}
            </h3>
          </div>

          {/* Payment Method Selector */}
          <div className="mb-4 flex justify-between items-center">
            <button
              onClick={() => setPaymentMethod("qr")}
              className={`w-1/2 py-2 rounded-l-lg font-medium border border-orange-400 ${
                paymentMethod === "qr"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-700"
              }`}
            >
              QR Code
            </button>
            <button
              onClick={() => setPaymentMethod("card")}
              className={`w-1/2 py-2 rounded-r-lg font-medium border border-orange-400 ${
                paymentMethod === "card"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-700"
              }`}
            >
              Credit / Debit Card
            </button>
          </div>

          {/* QR Code Payment UI */}
          {paymentMethod === "qr" && (
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?amount=100&size=150x150"
                  alt="QR Code"
                  className="mx-auto w-40 h-40"
                />
                <p className="text-sm text-gray-700 mt-2">
                  Scan this QR with any UPI app to pay ₹{totalAmount}
                </p>
              </div>
              <button
                onClick={handlePaymentComplete}
                className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                I've Paid
              </button>
            </div>
          )}

          {/* Card Payment UI */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-orange-900">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="p-2 border-2 border-orange-200 rounded-lg focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-orange-900">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="p-2 border-2 border-orange-200 rounded-lg focus:border-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-orange-900">CVV</label>
                  <input
                    type="password"
                    placeholder="123"
                    className="p-2 border-2 border-orange-200 rounded-lg focus:border-orange-500"
                  />
                </div>
              </div>

              <button
                onClick={handlePaymentComplete}
                className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Complete Payment
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
};

export default PaymentDialog;
