// src/components/Footer.jsx
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="w-full bg-orange-800 text-white py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <motion.div whileHover={{ y: -5 }} className="space-y-2">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-orange-600 pb-2">
              About Us
            </h3>
            <p className="text-orange-100">
              Your premier destination for the latest movies and unforgettable
              cinematic experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div whileHover={{ y: -5 }} className="space-y-2">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-orange-600 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition"
                >
                  Movies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition"
                >
                  Theaters
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition"
                >
                  Offers
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div whileHover={{ y: -5 }} className="space-y-2">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-orange-600 pb-2">
              Contact
            </h3>
            <address className="text-orange-100 not-italic">
              <p>123 Cinema Street</p>
              <p>Movie City, MC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@movietheatre.com</p>
            </address>
          </motion.div>

          {/* Social Media */}
          <motion.div whileHover={{ y: -5 }} className="space-y-2">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-orange-600 pb-2">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-orange-100 hover:text-white text-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <FaFacebook />
              </motion.a>
              <motion.a
                href="#"
                className="text-orange-100 hover:text-white text-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="#"
                className="text-orange-100 hover:text-white text-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="#"
                className="text-orange-100 hover:text-white text-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <FaYoutube />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-orange-700 mt-8 pt-6 text-center text-orange-200">
          <p>© {currentYear} Movie Theatre App. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
