import { motion } from 'framer-motion';

const Subscribe = () => {
  return (
    <div className="flex items-center justify-center bg-white relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative Blobs (hide on small screens) */}
      <div className="hidden sm:block absolute w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 top-[-6rem] left-[-6rem] z-0"></div>
      <div className="hidden sm:block absolute w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 top-1/2 left-3/4 z-0"></div>

      {/* Subscribe Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center relative z-10"
      >
        {/* Decorative Rings */}
        <div className="hidden sm:block absolute -top-24 -right-24 w-48 h-48 z-0">
          <div className="w-full h-full border-4 border-indigo-200 rounded-full opacity-40"></div>
        </div>
        <div className="hidden sm:block absolute -bottom-32 -left-16 w-64 h-64 z-0">
          <div className="w-full h-full border-4 border-indigo-100 rounded-full opacity-30"></div>
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 relative z-10"
        >
          Subscribe
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-gray-600 mb-6 relative z-10 text-sm sm:text-base"
        >
          Subscribe to our newsletter and get up to{" "}
          <span className="text-indigo-600 font-medium">40% off</span> on our exclusive service.
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row relative z-10 gap-3 sm:gap-0"
          onSubmit={(e) => e.preventDefault()}
        >
          <motion.input
            whileFocus={{ boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.2)" }}
            type="email"
            placeholder="Email Address"
            className="flex-1 px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none border-2 border-indigo-500 focus:outline-none text-sm sm:text-base"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 sm:px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-indigo-700 transition-all duration-200 text-sm sm:text-base"
          >
            SUBSCRIBE
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Subscribe;
