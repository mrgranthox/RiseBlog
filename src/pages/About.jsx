import React from "react";
import Navbar from "../compnents/Navbar";
import Footer from "../compnents/Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      <section className="flex items-center justify-center min-h-screen bg-white px-4 overflow-x-hidden">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-gray-600 text-lg mb-6">
            We are passionate about delivering top-notch services that bring
            value and satisfaction to our customers. Our mission is to provide
            exclusive offers, insightful updates, and tailored solutions that
            help you grow and thrive.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-8">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-6 w-full max-w-full md:max-w-xs shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-sm">
                To empower individuals and businesses through innovation,
                creativity, and unmatched service quality.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-6 w-full max-w-full md:max-w-xs shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-sm">
                Deliver personalized experiences and value-driven solutions that
                exceed expectations every time.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
