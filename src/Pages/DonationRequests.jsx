import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaTint,
} from "react-icons/fa";
import DonationRequestSkeleton from "../Components/DonationRequestSkeleton";

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: pendingData = [], isLoading } = useQuery({
    queryKey: ["donationRequests", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests?status=pending");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
              Pending Donation Requests
            </h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Help save lives by responding to these urgent blood donation
              requests in your area
            </p>
            <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {[...Array(8)].map((_, index) => (
              <DonationRequestSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
            Pending Donation Requests
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Help save lives by responding to these urgent blood donation
            requests in your area
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Cards Grid */}
        {pendingData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-base-content/70 mb-2">
              No Pending Requests
            </h3>
            <p className="text-base-content/50">
              There are currently no pending donation requests.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
          >
            {pendingData.map((pending, i) => (
              <motion.div
                key={pending._id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.15)",
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-300"
              >
                {/* Card Header */}
                <div className="bg-linear-to-r from-red-500 to-red-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium opacity-90">
                      Request #{i + 1}
                    </span>
                    <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                      <FaTint className="text-sm" />
                      <span className="text-sm font-semibold">
                        {pending.bloodGroup}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{pending.recipientName}</h3>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Address */}
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-red-500 mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-base-content/60 font-medium">
                        Location
                      </p>
                      <p className="text-base-content">{pending.fullAddress}</p>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-red-500" />
                      <div>
                        <p className="text-xs text-base-content/60 font-medium">
                          Date
                        </p>
                        <p className="text-sm font-semibold text-base-content">
                          {pending.donationDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-red-500" />
                      <div>
                        <p className="text-xs text-base-content/60 font-medium">
                          Time
                        </p>
                        <p className="text-sm font-semibold text-base-content">
                          {pending.donationTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-yellow-600 capitalize">
                        {pending.donationStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <Link
                    to={`/donation-request-details/${pending._id}`}
                    className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <FaEye className="group-hover:scale-110 transition-transform duration-200" />
                    <span>View Details</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DonationRequests;
