import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/context';
import { Menu, X } from 'lucide-react';
import { toast } from 'react-hot-toast'
import axiosInstance from '../axiosInstance';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {userData, setUserData, setIsLoggedin, isLoggedin} = useContext(AppContext)

  const sendVerificationOtp  = async() => {
    const toastId = toast.loading('Sending Otp...') 
    try {

      const { data } = await axiosInstance.post( "/auth/user/send-verify-otp")

      if(data.success) {
        toast.success(data.message, { id: toastId })
        navigate('/auth/verify')
      }
      else {
        toast.error(data.message)

      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async() => {
    try {
      const { data } = await axiosInstance.post("/auth/user/logout")

      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/')

      toast.success(data.message)

    } catch (error) {
      toast.error(error.message)
      
    }
  }


  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? 'text-black font-bold underline underline-offset-4'
      : 'hover:text-gray-800 hover:scale-105 transition-transform';

  const isActiveMobile = (path) =>
    location.pathname === path
      ? 'bg-gray-100 text-black font-semibold'
      : 'hover:bg-gray-100 text-gray-800';

  return (
   <div className='mt-14'>
     <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md transition-all duration-300">
      <div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-4'>
        <img
          onClick={() => navigate('/')}
          src='/RISEBLOG.svg'
          alt='Rise Blog'
          className='cursor-pointed object-contain hover:rotate-3 hover:scale-105 transition-transform duration-300 ease-in-out drop-shadow-md'
        />

        {/* Desktop Nav */}
        <nav className='hidden md:flex items-center gap-8 text-black font-medium'>
          <button onClick={() => navigate('/')} className={`transition ${isActive('/')}`}>Home</button>
          <button onClick={() => navigate('/articles')} className={`transition ${isActive('/articles')}`}>Articles</button>
          <button onClick={() => navigate('/about')} className={`transition ${isActive('/about')}`}>About</button>
          <button onClick={() => navigate('/contact')} className={`transition ${isActive('/contact')}`}>Contact</button>

          {isLoggedin && userData?.name && (
  <div className='relative group'>
    <div className='bg-gray-200 text-black text-sm w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-300'>
     {userData.profilePicture ? <img src={userData.profilePicture} className='w-full h-full rounded-full object-cover' /> : userData.name.charAt(0).toUpperCase()}
    </div>
    <div className='absolute hidden group-hover:flex flex-col bg-white text-gray-800 shadow-lg rounded-lg right-0 min-w-[150px] z-50'>
      <button onClick={() => navigate('/profile')} className='text-left px-4 py-2 hover:bg-gray-100'>Profile</button>
      {!userData.isAccountVerified && 
        <button 
          onClick={sendVerificationOtp}
          className='text-left px-4 py-2 hover:bg-gray-100'>Verify Email</button>}
      <button 
        onClick={logout}
        className='text-left px-4 py-2 hover:bg-gray-100'>Logout</button>
    </div>
  </div>
)}

        </nav>

        {/* Mobile Toggle Button */}
        <div className='md:hidden'>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-black">
            {isMobileOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Nav (Positioned absolute over content) */}
      {isMobileOpen && (
        <div className='absolute top-full left-0 right-0 md:hidden px-6 py-4 bg-white shadow-lg backdrop-blur-md'>
          <ul className='text-black font-medium flex flex-col gap-3'>
            <li onClick={() => { navigate('/'); setIsMobileOpen(false); }} className={`cursor-pointer px-4 py-2 rounded ${isActiveMobile('/')}`}>Home</li>
            <li onClick={() => { navigate('/articles'); setIsMobileOpen(false); }} className={`cursor-pointer px-4 py-2 rounded ${isActiveMobile('/articles')}`}>Articles</li>
            <li onClick={() => { navigate('/about'); setIsMobileOpen(false); }} className={`cursor-pointer px-4 py-2 rounded ${isActiveMobile('/about')}`}>About</li>
            <li onClick={() => { navigate('/contact'); setIsMobileOpen(false); }} className={`cursor-pointer px-4 py-2 rounded ${isActiveMobile('/contact')}`}>Contact</li>
            <hr className='my-2 border-gray-200' />
            {isLoggedin ? (
              <>
                <li onClick={() => { navigate('/profile'); setIsMobileOpen(false); }} className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded'>Profile</li>
               {!userData.isAccountVerified && 
               <li 
               onClick={sendVerificationOtp}
               className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded'>Verify Email</li>}
                <li 
                onClick={logout}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded'>Logout</li>
              </>
            ) : (
              <>
                <li>
                  <button
                    className='w-full bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900 transition'
                    onClick={() => { navigate('/login'); setIsMobileOpen(false); }}
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    className='w-full border border-black text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition'
                    onClick={() => { navigate('/login'); setIsMobileOpen(false); }}
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
   </div>
  );
};

export default Navbar;
