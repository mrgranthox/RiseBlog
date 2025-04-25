import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';

const BestToday = () => {
  const { postLists } = useContext(AppContext);
  const navigate = useNavigate()

  const bestPosts = Array.isArray(postLists) ? postLists.slice(0, 4) : [];
  return (
   
<motion.div 
      initial={{ backgroundColor: "#2563eb" }}
      whileInView={{ backgroundColor: "#1d4ed8" }}
      transition={{ duration: 1.5 }}
      className="py-12 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      {[
        { top: 0, left: 0, x: "-1/3", y: "-1/2", size: "w-96 h-96", duration: 20, rotateDir: 1 },
        { bottom: 0, right: 0, x: "1/3", y: "1/2", size: "w-96 h-96", duration: 25, rotateDir: -1 },
        { top: 0, right: 0, x: "1/3", y: "-1/3", size: "w-64 h-64", duration: 30, rotateDir: -1 },
        { bottom: 0, left: 0, x: "-1/3", y: "1/3", size: "w-64 h-64", duration: 35, rotateDir: 1 }
      ].map((circle, idx) => (
        <motion.div
          key={idx}
          animate={{ 
            rotate: circle.rotateDir > 0 ? [0, 360] : [360, 0],
            scale: [1, 1.05 + idx * 0.05, 1] 
          }}
          transition={{ duration: circle.duration, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          className={`absolute ${circle.top !== undefined ? 'top-0' : 'bottom-0'} ${circle.left !== undefined ? 'left-0' : 'right-0'} ${circle.size} translate-x-${circle.x} translate-y-${circle.y}`}
        >
          <div className="w-full h-full border-8 border-white rounded-full opacity-20"></div>
        </motion.div>
      ))}

      <div className="container mx-auto">
        {/* Heading */}
        {postLists? <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 relative z-10"
        >
          <motion.h1 
            className="text-7xl font-bold text-black"
            initial={{ letterSpacing: "0px" }}
            whileInView={{ letterSpacing: "2px" }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Best
            <br />
            <motion.span 
              className="text-white"
              initial={{ opacity: 0.5 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              Article
            </motion.span>
            <br />
            Today
          </motion.h1>
        </motion.div> : <p className='text-lg text-white flex align-center justify-center'>No Internet Connection</p>
}
        {/* Cards */}
       {postLists ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {bestPosts.map((post, idx) => (
            <motion.div 
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative">
                <img 
                  src={post.coverImage || "/api/placeholder/400/240"} 
                  className="w-full h-48 object-cover" 
                  alt={post.title} 
                />
                <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img src={post.author?.profilePicture || "/api/placeholder/20/20"} alt={post.author?.name || 'Author'} />
                  </div>
                  <span>{post.author?.name || 'Unknown'}</span>
                </div>
                <div className={`absolute bottom-3 left-3 ${getCategoryColor(post.category)} text-white rounded-md px-3 py-1 text-xs`}>
                  {post.tags}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{post.excerpt || 'No excerpt available...'}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <Link to={`/articles/post/${post.slug}`}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 bg-blue-600 text-white rounded-md py-2 px-4 w-full text-sm font-medium"
                  >
                    Read More
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div> : <p className='text-lg text-white font-base flex align-center justify-center'>Check internet connection and refresh page</p>
}
        {/* See All */}
      {postLists && <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
            <motion.button
              onClick={() => navigate('/articles')}
              whileHover={{ scale: 1.05 }}             
              whileTap={{ scale: 0.95 }}                
              className="bg-white text-blue-600 font-medium py-3 px-12 rounded-full text-lg transition-colors hover:bg-blue-50 active:bg-blue-100 z-10"
            >
              See All Articles
            </motion.button>

        </motion.div>}
      </div>
</motion.div>
  );
};

// Helpers
const getCategoryColor = (category) => {
  switch (category?.toLowerCase()) {
    case "tech":
      return "bg-blue-600";
    case "environment":
      return "bg-green-600";
    case "business":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.toLocaleDateString()}`
};

export default BestToday;
