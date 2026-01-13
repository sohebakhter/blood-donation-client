import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useRole from "../../../Hooks/useRole";
import {
  FiEdit3,
  FiTrash2,
  FiEye,
  FiCheck,
  FiX,
  FiFilter,
  FiUsers,
  FiActivity,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const AllDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  const [status, setStatus] = useState("all");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock className="w-4 h-4" />;
      case "inprogress":
        return <FiActivity className="w-4 h-4" />;
      case "done":
        return <FiCheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <FiXCircle className="w-4 h-4" />;
      default:
        return <FiUsers className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inprogress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "done":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["total-donation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-donation");
      return res.data;
    },
  });

  //এখানে ফিলটার করা হচ্ছে (with Status)
  const filteredRequests =
    status === "all"
      ? requests
      : requests.filter((s) => s.donationStatus === status);

  const handleDone = (id) => {
    // Update the donation request status to "done"
    const updateInfo = { donationStatus: "done" };
    axiosSecure.patch(`/donation-requests/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast("Donation request marked as done.");
        // Optionally, refetch the requests or update the local state
        refetch();
      }
    });
  };
  const handleCancel = (id) => {
    // Update the donation request status to "cancelled"
    const updateInfo = { donationStatus: "cancelled" };
    axiosSecure.patch(`/donation-requests/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast("Donation request marked as cancelled.");
        // Optionally, refetch the requests or update the local state
        refetch();
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-requests/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  const isAvailable = filteredRequests.some(
    (s) => s.donationStatus === "inprogress"
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <motion.h1
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                All Donation Requests
              </motion.h1>
              <motion.p
                className="text-gray-600 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Manage and track all blood donation requests
              </motion.p>
            </div>

            {/* Filter Section */}
            <motion.div
              className="flex items-center gap-3 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
              variants={itemVariants}
            >
              <FiFilter className="text-gray-500 w-5 h-5" />
              <select
                className="bg-transparent border-none outline-none text-gray-700 font-medium cursor-pointer"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              label: "Total Requests",
              value: requests.length,
              color: "bg-blue-500",
              icon: FiUsers,
            },
            {
              label: "Pending",
              value: requests.filter((r) => r.donationStatus === "pending")
                .length,
              color: "bg-yellow-500",
              icon: FiClock,
            },
            {
              label: "In Progress",
              value: requests.filter((r) => r.donationStatus === "inprogress")
                .length,
              color: "bg-blue-500",
              icon: FiActivity,
            },
            {
              label: "Completed",
              value: requests.filter((r) => r.donationStatus === "done").length,
              color: "bg-green-500",
              icon: FiCheckCircle,
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Table Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-red-500 to-pink-500">
                <tr>
                  {[
                    "#",
                    "Requester",
                    "Email",
                    "Recipient",
                    "District",
                    "Blood Group",
                    "Status",
                    isAvailable && "Actions",
                  ]
                    .filter(Boolean)
                    .map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredRequests.map((r, i) => (
                    <motion.tr
                      key={r._id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="hover:bg-gray-50 transition-colors duration-200"
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {r.requesterName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {r.requesterEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {r.recipientName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {r.recipientDistrict}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                          {r.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            r.donationStatus
                          )}`}
                        >
                          {getStatusIcon(r.donationStatus)}
                          {r.donationStatus}
                        </span>
                      </td>
                      {r.donationStatus === "inprogress" && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {role === "admin" && (
                              <>
                                <motion.button
                                  variants={buttonVariants}
                                  whileHover="hover"
                                  whileTap="tap"
                                  className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                  <FiEdit3 className="w-4 h-4" />
                                  <Link
                                    to={`/dashboard/manage-donation-request/${r._id}`}
                                  >
                                    Edit
                                  </Link>
                                </motion.button>
                                <motion.button
                                  variants={buttonVariants}
                                  whileHover="hover"
                                  whileTap="tap"
                                  onClick={() => handleDelete(r._id)}
                                  className="inline-flex items-center gap-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                  Delete
                                </motion.button>
                                <motion.button
                                  variants={buttonVariants}
                                  whileHover="hover"
                                  whileTap="tap"
                                  className="inline-flex items-center gap-1 px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
                                >
                                  <FiEye className="w-4 h-4" />
                                  <Link
                                    to={`/dashboard/donation-request-details/${r._id}`}
                                  >
                                    View
                                  </Link>
                                </motion.button>
                              </>
                            )}
                            <motion.button
                              variants={buttonVariants}
                              whileHover="hover"
                              whileTap="tap"
                              onClick={() => handleDone(r._id)}
                              className="inline-flex items-center gap-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                            >
                              <FiCheck className="w-4 h-4" />
                              Done
                            </motion.button>
                            <motion.button
                              variants={buttonVariants}
                              whileHover="hover"
                              whileTap="tap"
                              onClick={() => handleCancel(r._id)}
                              className="inline-flex items-center gap-1 px-3 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors duration-200"
                            >
                              <FiX className="w-4 h-4" />
                              Cancel
                            </motion.button>
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredRequests.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FiUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No donation requests found
              </h3>
              <p className="text-gray-500">
                {status === "all"
                  ? "There are no donation requests at the moment."
                  : `No ${status} donation requests found.`}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AllDonationRequest;
