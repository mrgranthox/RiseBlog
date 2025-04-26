import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../compnents/Navbar';
import Footer from '../compnents/Footer';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, MoreVertical, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import { toast } from 'react-hot-toast'
import axiosInstance from '../axiosInstance';

const Profile = () => {  

  const { userData, getPostByUser, isLoggedIn, postByUser } = useContext(AppContext);
  const [showActionsFor, setShowActionsFor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && userData) {
      postByUser();
    }
  }, [isLoggedIn]);

  const toggleActions = (index) => {
    setShowActionsFor(showActionsFor === index ? null : index);
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading('Deleting post...') 
    
    try {
     const { data } = await axiosInstance.delete(`/post/delete-post/${id}`)

     if(data.success) {
      toast.success('Post deleted successfully!', { id: toastId }) 
      toast.success(data.message)
      await postByUser();
     }else {
     toast.error(data.message || 'Something went wrong', { id: toastId })
     }

    } catch {
    toast.error('Failed to delete post!', { id: toastId })     }
    setShowActionsFor(null);
  };

  return (
    <div>
      <Navbar />

      <section className="relative z-0 min-h-screen bg-gradient-to-br from-[#1e1e2f] via-[#2c2c3f] to-[#1e1e2f] text-white px-4 py-16 md:py-24 overflow-hidden w-full">
        <div className="pointer-events-none absolute top-[-100px] left-[60%] w-[400px] h-[400px] bg-purple-600 rounded-full opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-100px] right-[60%] w-[400px] h-[400px] bg-indigo-500 rounded-full opacity-20 blur-3xl" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
          {/* Profile Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="md:col-span-4 md:sticky md:top-24 self-start bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl space-y-6"
          >
            <div className="relative w-32 h-32 mx-auto">
              <img src={userData?.profilePicture || "/RISEBLOG.svg"} alt="Profile" className="relative z-10 rounded-full border-4 border-white shadow-lg object-cover w-full h-full" />
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-30 rounded-full scale-110"></div>
            </div>
            <h1 className="text-3xl font-bold text-center">{userData?.name || "loading..."}</h1>
            <p className="text-white/80 leading-relaxed text-lg">
                {userData?.bio || "You haven't set a bio yet."}
              </p>
            <button 
              onClick={() => navigate('/profile/edit')}
              className="block w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-full text-center transition"
            >
              Edit Profile
            </button>

          </motion.div>

          {/* Main Content */}
          <div className="md:col-span-8 space-y-16">
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.8 }} 
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Articles</h2>
                <motion.button
                  onClick={() => navigate('/profile/create')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus size={16} />
                  <span>Create New Post</span>
                </motion.button>
              </div>

              {getPostByUser && (
                <div className="max-h-[800px] overflow-y-auto pr-2 -mr-2 pb-4 scrollbar-hide">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {getPostByUser.map((post, i) => (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        key={post.id}
                        className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-md hover:shadow-2xl relative group"
                      >
                        <div className="relative">
                          <img src={post?.coverImage || "/RISEBLOG.svg"} alt={post?.title} className="w-full h-48 object-cover" />
                          <div className="absolute top-3 right-3 z-20">
                            <button 
                              onClick={() => toggleActions(i)}
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all shadow-lg"
                            >
                              <MoreVertical size={16} />
                            </button>
                            {showActionsFor === i && (
                              <div className="absolute right-0 mt-2 w-40 rounded-lg bg-black/70 backdrop-blur-xl shadow-2xl border border-white/20 overflow-hidden z-30">
                                <div 
                                onClick={() => navigate(`/articles/post/${post.slug}`)}className="flex items-center gap-2 px-4 py-3 text-white hover:bg-white/20 cursor-pointer transition-colors">
                                  <Eye size={16} />
                                  <span>View</span>
                                </div>
                                <div onClick={() => navigate(`/profile/edit-post/${post.id}`)} className="flex items-center gap-2 px-4 py-3 text-white hover:bg-white/20 cursor-pointer transition-colors">
                                  <Edit size={16} />
                                  <span>Edit</span>
                                </div>
                                <div onClick={() => handleDelete(post.id)} className="flex items-center gap-2 px-4 py-3 text-red-300 hover:bg-red-500/40 cursor-pointer transition-colors">
                                  <Trash2 size={16} />
                                  <span>Delete</span>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">
                            {post.date}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                          <p className="text-sm text-white/70 mt-2 line-clamp-3">{post.content}</p>
                          <div className="mt-6 flex items-center justify-between">
                            <button 
                            onClick={() => navigate(`/articles/post/${post.slug}`)}
                            className="text-white/70 hover:text-white text-sm flex items-center gap-1">
                              Read more →
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {getPostByUser.length === 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                      <p className="text-white/70">You haven't created any posts yet.</p>
                      <button 
                        onClick={() => navigate('/profile/create')}
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm transition flex items-center gap-2 mx-auto"
                      >
                        <Plus size={16} />
                        Create Your First Post
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
