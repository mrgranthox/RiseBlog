import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroImage from "/RISEBLOG.svg";
import { toast } from "react-hot-toast";
import axiosInstance from "../axiosInstance";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Sending Otp...");
    try {
      const { data } = await axiosInstance.post("/auth/user/send-rest-otp", {
        email,
      });
      if (data.success) {
        toast.success(data.message, { id: toastId });
      } else {
        toast.error(data.message, { id: toastId });
      }
      data.success && setIsEmailSent(true);
    } catch {
      toast.error(
        "Failed to send Otp. Check Internet Connection and try again",
        { id: toastId }
      );
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Validating Otp...");

    try {
      const { data } = await axiosInstance.post("/auth/user/validate-otp", {
        email,
        otp,
      });
      if (data.success) {
        setIsOtpSubmitted(true);
        toast.success(data.message, { id: toastId });
      } else {
        toast.error(data.message, { id: toastId });
      }
    } catch {
      toast.error(
        "Failed to validate Otp. Check Internet Connection and try again",
        { id: toastId }
      );
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Reseting password...");

    try {
      const { data } = await axiosInstance.post("auth/user/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (data.success) {
        toast.success(data.message, { id: toastId });
      } else {
        toast.error(data.message, { id: toastId });
      }
      data.success && navigate("/login");
    } catch {
      toast.error(
        "Failed to reset password. Check Internet Connection and try again",
        { id: toastId }
      );
    }
  };

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
        <h1 className="text-gray-800 text-3xl font-semibold text-center mb-4">
          Reset password
        </h1>

        {!isEmailSent && (
          <form onSubmit={handleEmailSubmit}>
            <p className="text-center mb-5 text-gray-500">
              Enter your registered email address
            </p>

            <div className="space-y-6">
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
              />
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-2xl font-semibold shadow-md hover:brightness-110 transition">
                Send OTP
              </button>
            </div>
          </form>
        )}

        {isEmailSent && !isOtpSubmitted && (
          <form onSubmit={handleOtpSubmit}>
            <p className="text-center mb-5 text-gray-500">
              Enter the Otp sent to mailbox
            </p>
            <div className="space-y-6">
              <input
                type="text"
                value={otp}
                required
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 text-sm"
              />
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-2xl font-semibold shadow-md hover:brightness-110 transition">
                Verify OTP
              </button>
            </div>
          </form>
        )}

        {isEmailSent && isOtpSubmitted && (
          <form onSubmit={handleResetPasswordSubmit}>
            <p className="text-center mb-5 text-gray-500">Enter New Password</p>

            <div className="space-y-6">
              <input
                type="password"
                value={newPassword}
                required
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 text-sm"
              />
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl font-semibold shadow-md hover:brightness-110 transition">
                Set New Password
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;
