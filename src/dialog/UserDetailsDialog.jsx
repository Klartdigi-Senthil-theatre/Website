import { motion } from "framer-motion";
import { X } from "lucide-react";

const UserDetailsDialog = ({
  formData,
  handleChange,
  handleUserDetailsSubmit,
  onClose
}) => {
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
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-semibold text-orange-900">
            Enter Your Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleUserDetailsSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-orange-900">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border-2 border-orange-200 rounded-lg focus:border-orange-500"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-orange-900">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border-2 border-orange-200 rounded-lg focus:border-orange-500"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="mobile" className="font-medium text-orange-900">
              Mobile Number:
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="p-2 border-2 border-orange-200 rounded-lg focus:border-orange-500"
              required
              //pattern="[0-9]{10}"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Submit Details
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UserDetailsDialog;
import { motion } from "framer-motion";
import { X } from "lucide-react";

const UserDetailsDialog = ({
  formData,
  handleChange,
  handleUserDetailsSubmit,
  onClose
}) => {
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
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-semibold text-orange-900">
            Enter Your Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleUserDetailsSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-orange-900">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border-2 border-orange-200 rounded-lg focus:border-orange-500"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-orange-900">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border-2 border-orange-200 rounded-lg focus:border-orange-500"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="mobile" className="font-medium text-orange-900">
              Mobile Number:
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="p-2 border-2 border-orange-200 rounded-lg focus:border-orange-500"
              required
              //pattern="[0-9]{10}"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Submit Details
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UserDetailsDialog;