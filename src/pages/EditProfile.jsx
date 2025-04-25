import React, { useContext, useState } from 'react';
import { AppContext } from '../context/context';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftCircle } from 'lucide-react';
import Navbar from '../compnents/Navbar';
import Footer from '../compnents/Footer';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-hot-toast'

const EditProfile = () => {
  const { userData, getUserData } = useContext(AppContext);
  const [name, setName] = useState(userData.name || '');
  const [bio, setBio] = useState(userData.bio || '');
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(userData.profilePicture || '');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Updating profile...') 

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    if (profilePicture instanceof File) {
      formData.append('profilePicture', profilePicture);
    }
  
    try {
      await axiosInstance.post('/auth/user/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      await getUserData(); 
      toast.success('Profile updated!', { id: toastId }) 
      navigate('/profile');
    } catch {
      toast.error('Profile update failed. Check Internet Connection and try again!', { id: toastId }) 
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">

      <section className="min-h-screen bg-gradient-to-br from-[#1e1e2f] via-[#2c2c3f] to-[#1e1e2f] text-white px-4 py-20">
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-4"
          >
            <ArrowLeftCircle 
              className="cursor-pointer hover:text-indigo-400 transition" 
              size={28} 
              onClick={() => navigate('/profile')}
            />
            <h2 className="text-2xl font-bold">Edit Profile</h2>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <img 
                src={previewImage || "https://via.placeholder.com/150"} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <label className="cursor-pointer text-sm bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-full text-white">
                Change Profile Picture
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden" 
                />
              </label>
            </div>

            <div>
              <label className="block text-sm mb-1">Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/20 text-white border border-white/20 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Bio</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="4"
                className="w-full bg-white/20 text-white border border-white/20 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="text-right">
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full text-white text-sm font-medium shadow-lg transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
    <Footer />
  </div>
  );
};

export default EditProfile;
