import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AppContext } from "./context/context";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Articles from "./pages/Articles";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import AuthPage from "./pages/AuthPage";
import VerifyAccount from "./pages/VerifyEmail";
import ResetPassword from "./pages/Reset";
import EditProfile from "./pages/EditProfile";

function App() {
  const { loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen transparent">
        <div className="flex space-x-2">
          <div className="w-2 h-10 bg-blue-600 rounded animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-8 bg-purple-600 rounded animate-bounce"></div>
          <div className="w-2 h-10 bg-blue-600 rounded animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-8 bg-purple-600 rounded animate-bounce"></div>
          <div className="w-2 h-10 bg-blue-600 rounded animate-bounce [animation-delay:-0.3s]"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "0.95rem",
          },
          success: { background: "#D1FAE5", color: "#064E3B" },
          error: { background: "#FECACA", color: "#7F1D1D" },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/post/:slug" element={<PostDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/create" element={<CreatePost />} />
        <Route path="/profile/edit-post/:id" element={<EditPost />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/auth/verify" element={<VerifyAccount />} />
        <Route path="/auth/reset" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
