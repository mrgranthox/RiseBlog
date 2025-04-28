import React from "react";
import Navbar from "../compnents/Navbar";
import Footer from "../compnents/Footer";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center px-4 py-20 bg-white relative overflow-hidden">
        {/* Blurry blob background accents */}
        <div className="absolute w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 top-[-6rem] left-[-6rem] z-0"></div>
        <div className="absolute w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 bottom-[-4rem] right-[-4rem] z-0"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 bg-gray-100 rounded-2xl shadow-2xl p-10 w-full max-w-2xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Get in Touch
          </h2>

          <p className="text-gray-600 mb-10 text-center max-w-md mx-auto">
            We’d love to hear from you. Send us a message and we’ll respond as
            soon as possible.
          </p>

          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
              required
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
