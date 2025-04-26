import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroImage from '/RISEBLOG.svg';
import { AppContext } from '../context/context';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import axiosInstance from '../axiosInstance';


const AuthPage = () => {


  const { setIsLoggedin, getUserData, postByUser } = useContext(AppContext);
  const [state, setState] = useState("Sign Up"); 
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    axios.defaults.withCredentials = true;
  
    const toastId = toast.loading(state === "Sign Up" ? 'Registering...' : 'Logging in...');
  
    try {
      const endpoint = state === "Sign Up" ? "/auth/user/register" : "/auth/user/login";
      const payload = state === "Sign Up"
        ? { name, email, password }
        : { email, password };
  
      const { data } = await axiosInstance.post(endpoint, payload);
  
      if (data.success) {
        setIsLoggedin(true);
  
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          await getUserData();
          await postByUser();
          navigate("/");
          toast.success(state === "Sign Up" ? "Account created successfully!" : "Logged in successfully!", { id: toastId });
        } catch (nestedError) {
          console.error("⚠️ Error after login:", nestedError);
          toast.error("Check internet connection or refresh page", { id: toastId });
        }
      } else {
        toast.error(data.message || "Something went wrong", { id: toastId });
      }
    } catch (error) {
      if (!navigator.onLine) {
        toast.error('You are offline. Please check your internet connection.', { id: toastId });
      } else if (error.response) {
        toast.error(error.response.data.message || 'Server responded with an error', { id: toastId });
      } else if (error.request) {
        toast.error('No response from server. Please check internet connection and try again.', { id: toastId });
      } else {
        toast.error('Something went wrong', { id: toastId });
      }
    }
    
  };
  
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-purple-100 px-4">
      <div className="mb-6">
        <img src={HeroImage} alt="Logo" className="w-40 sm:w-50 mb-8 h-auto" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-8 sm:p-12 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {state === "Sign Up" ? "Create your account" : "Login to your account"}
        </h2>

        <form onSubmit={handleSubmit}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <input
                onChange={e => setName(e.currentTarget.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none text-white w-full"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <input
              onChange={e => setEmail(e.currentTarget.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <input
              onChange={e => setPassword(e.currentTarget.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          <p
            onClick={() => navigate('/auth/reset')}
            className="mb-4 text-indigo-500 cursor-pointer hover:underline"
          >
            Forgot password
          </p>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer font-medium text-white">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span onClick={() => setState("Login")} className="text-blue-400 cursor-pointer underline">
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span onClick={() => setState("Sign Up")} className="text-blue-400 cursor-pointer underline">
              Sign up
            </span>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;
