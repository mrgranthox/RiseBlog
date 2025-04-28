import { motion } from "framer-motion";
import HeroImage from "/RISEBLOG.svg";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../axiosInstance";
import { AppContext } from "../context/context";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const { getUserData, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const toastId = toast.loading("Verifying account...");
      const { data } = await axiosInstance.post("/auth/user/verify-account", {
        otp,
      });

      if (data.success) {
        toast.success(data.message, { id: toastId });
        getUserData();
        navigate("/");
      } else {
        toast.error(data.error, { id: toastId });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    userData && userData.isAccountVerified;
  }, [userData]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-purple-100 px-4">
      <div className="mb-6">
        <img src={HeroImage} alt="Logo" className="w-40 sm:w-50 mb-8 h-auto" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full"
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-3">
            Verify Your Account
          </h2>
          <p className="text-center mb-8 text-gray-500">
            Enter the Otp sent to mailbox
          </p>

          <div className="space-y-6">
            <input
              type="password"
              value={otp}
              required
              onChange={(e) => setOtp(e.currentTarget.value)}
              placeholder="Enter otp"
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 text-sm"
            />
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl font-semibold shadow-md hover:brightness-110 transition">
              Verify Account
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyAccount;
