import { useContext } from "react";
import { motion } from "framer-motion";
import HeroImage from "../assets/hero-image.svg";
import { AppContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Hero = () => {
  const { isLoggedin, postLists } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="relative overflow-hidden bg-white py-24 px-6 md:px-16 lg:px-24">
        {/* Blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-300 opacity-20 rounded-full blur-3xl z-0 animate-pulse"></div>
        <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-indigo-400 opacity-20 rounded-full blur-3xl z-0 animate-pulse"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 max-w-7xl mx-auto ">
          {/* Left Side Image */}
          <motion.img
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            src={HeroImage}
            alt="Hero"
            className="w-80 sm:w-80 md:w-90 lg:w-[400px] xl:w-[460px] object-contain drop-shadow-2xl"
          />

          {/* Right Side Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-center md:text-left max-w-xl space-y-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl sm:text-6xl md:4xl lg:text-7xl font-bold leading-tight text-gray-800"
            >
              Write Your
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent font-extrabold drop-shadow-md"
            >
              Article
            </motion.h2>

            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="block text-5xl sm:text-6xl lg:text-7xl text-gray-900 font-bold"
            >
              Here.
            </motion.span>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg sm:text-xl text-gray-600 mt-4"
            >
              A clean, powerful, and elegant way to express your thoughts —
              start writing now.
            </motion.p>

            {!isLoggedin ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
                onClick={() => navigate("/login")}
                className="mt-8 px-14 py-2  bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300"
              >
                Log in
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
                onClick={() => navigate("/profile/create")}
                className="mt-8 px-14 py-2  bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300"
              >
                Create Post
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Featured Blog Posts */}
      {postLists && (
        <div className="max-w-6xl my-16 mx-auto px-4 md:px-8 mt-20 mb-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-12 text-center">
            Featured Posts
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            {Array.isArray(postLists) &&
              postLists.slice(0, 2).map((post) => (
                <motion.div
                  key={post._id}
                  whileHover={{
                    y: -4,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                  }}
                  className="bg-gray-100 rounded-xl p-6 transition duration-300 border border-gray-200 flex flex-col justify-between md:w-1/2"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="text-gray-500 text-xs mb-4">
                      By {post.author?.name || "Unknown"} •{" "}
                      {post.createdAt
                        ? format(new Date(post.createdAt), "MMMM d, yyyy")
                        : "Unknown date"}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/articles/post/${post.slug}`)}
                    className="self-start mt-auto px-4 py-2 text-sm font-medium text-blue-600 hover:underline hover:text-blue-800 transition-all"
                  >
                    Read more →
                  </button>
                </motion.div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
