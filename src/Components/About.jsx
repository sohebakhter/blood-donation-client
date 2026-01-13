import React from "react";
import donateImg from "../assets/blood-donation-3.png";
import { FaSearch, FaHeart, FaUsers, FaAward } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-gray-800 min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-white"
    >
      {/* Hero Intro */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            About{" "}
            <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
              Red Love
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl leading-8 mb-8 text-gray-600 max-w-4xl mx-auto"
          >
            RedLove is a community-driven platform dedicated to connecting blood
            donors with people in urgent need. We also provide a trusted way for
            users to contribute small funds to support medical emergencies,
            transportation, and social wellness projects.
          </motion.p>
        </motion.div>
      </div>

      {/* Main Section */}
      <div className="bg-gradient-to-b from-red-100 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            {/* Image */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-3xl blur-2xl opacity-20 transform rotate-6"></div>
                <img
                  src={donateImg}
                  alt="Blood Donation"
                  className="relative max-w-sm sm:max-w-md lg:max-w-lg w-full rounded-3xl shadow-2xl border-4 border-white"
                />
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl font-bold text-gray-800"
                >
                  About RedLove
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="text-base sm:text-lg leading-8 text-gray-600"
                >
                  Red Love is a community-driven blood donation platform
                  dedicated to saving lives by connecting blood donors with
                  patients in need. It enables users to create and manage blood
                  donation requests, view real-time details, and respond quickly
                  during emergencies. With a simple and user-friendly design,
                  Red Love aims to make blood donation faster, easier, and more
                  accessible for everyone.
                </motion.p>
              </div>

              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-white rounded-xl p-4 shadow-lg border border-red-100">
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-red-500 text-2xl" />
                    <div>
                      <h3 className="font-bold text-gray-800">10K+</h3>
                      <p className="text-sm text-gray-600">Lives Saved</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border border-red-100">
                  <div className="flex items-center gap-3">
                    <FaHeart className="text-red-500 text-2xl" />
                    <div>
                      <h3 className="font-bold text-gray-800">5K+</h3>
                      <p className="text-sm text-gray-600">Donors</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-red-600">RedLove</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the features that make RedLove the trusted choice for
              blood donation management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl shadow-xl border border-red-100 hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6"
              >
                <IoMdLock className="text-white text-2xl" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                All Data is Secured
              </h3>
              <p className="text-gray-600 leading-7">
                Your personal and donation-related information is safely stored
                and protected. Red Love ensures data privacy and security so
                users can focus on what truly matters—saving lives.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6"
              >
                <FaAward className="text-white text-2xl" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Always Free for All
              </h3>
              <p className="text-gray-600 leading-7">
                Red Love is completely free to use for everyone. There are no
                hidden charges or fees—our mission is to make blood donation
                accessible, open, and available to all who want to help save
                lives.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 md:col-span-2 lg:col-span-1"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6"
              >
                <FaSearch className="text-white text-2xl" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Advance Search Feature
              </h3>
              <p className="text-gray-600 leading-7">
                Easily find blood donors by selecting blood group, district, and
                upazila. This advanced search helps you quickly connect with the
                right donors during emergencies.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-red-600 to-red-700 py-16"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            Join Our Mission to Save Lives
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-red-100 mb-8"
          >
            Be part of a community that makes a real difference. Every donation
            counts.
          </motion.p>
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default About;
