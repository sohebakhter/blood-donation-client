import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const MyDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [status, setStatus] = useState("all");

  const [totalRequest, setTotalRequest] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myDonationRequests", user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-donation-requests?email=${user?.email}&limit=${limit}&skip=${
          currentPage * limit
        }`
      );

      setTotalRequest(res.data.total);
      const page = Math.ceil(res.data.total / limit);
      setTotalPage(page);
      return res.data.data;
    },
  });
  if (isLoading) return <Loading></Loading>;
  console.log(totalRequest);

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

  // Calculate stats
  const stats = {
    total: totalRequest,
    pending: filteredRequests.filter((r) => r.donationStatus === "pending")
      .length,
    inprogress: filteredRequests.filter(
      (r) => r.donationStatus === "inprogress"
    ).length,
    done: filteredRequests.filter((r) => r.donationStatus === "done").length,
    cancelled: filteredRequests.filter((r) => r.donationStatus === "cancelled")
      .length,
  };

  // Smart pagination: show limited page buttons
  const getVisiblePages = () => {
    const pages = [];
    const delta = 2;
    const currentPageNum = currentPage + 1; // 1-indexed
    const start = Math.max(1, currentPageNum - delta);
    const end = Math.min(totalPage, currentPageNum + delta);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPage) {
      if (end < totalPage - 1) pages.push("...");
      pages.push(totalPage);
    }

    return pages;
  };

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
      transition: { duration: 0.5 },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-100 p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl font-bold text-red-800 mb-2">
            My Donation Requests
          </h2>
          <p className="text-gray-600 text-lg">
            Manage and track your blood donation requests
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white rounded-lg shadow-md p-4 text-center border-l-4 border-red-500"
            variants={statVariants}
          >
            <div className="text-2xl font-bold text-red-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </motion.div>
          <motion.div
            className="bg-white rounded-lg shadow-md p-4 text-center border-l-4 border-yellow-500"
            variants={statVariants}
          >
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </motion.div>
          <motion.div
            className="bg-white rounded-lg shadow-md p-4 text-center border-l-4 border-blue-500"
            variants={statVariants}
          >
            <div className="text-2xl font-bold text-blue-600">
              {stats.inprogress}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </motion.div>
          <motion.div
            className="bg-white rounded-lg shadow-md p-4 text-center border-l-4 border-green-500"
            variants={statVariants}
          >
            <div className="text-2xl font-bold text-green-600">
              {stats.done}
            </div>
            <div className="text-sm text-gray-600">Done</div>
          </motion.div>
          <motion.div
            className="bg-white rounded-lg shadow-md p-4 text-center border-l-4 border-gray-500"
            variants={statVariants}
          >
            <div className="text-2xl font-bold text-gray-600">
              {stats.cancelled}
            </div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </motion.div>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <select
            className="select select-bordered bg-white border-red-300 text-red-700 focus:border-red-500 focus:ring-red-500 px-6 py-2 text-lg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </motion.div>

        {/* Requests Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          {filteredRequests.map((r, i) => (
            <motion.div
              key={r._id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative ${
                r.donationStatus === "inprogress"
                  ? "border-l-8 border-blue-500"
                  : r.donationStatus === "done"
                  ? "border-l-8 border-green-500"
                  : r.donationStatus === "cancelled"
                  ? "border-l-8 border-gray-500"
                  : "border-l-8 border-yellow-500"
              }`}
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      Request #{i + 1}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        r.donationStatus === "inprogress"
                          ? "bg-blue-100 text-blue-800"
                          : r.donationStatus === "done"
                          ? "bg-green-100 text-green-800"
                          : r.donationStatus === "cancelled"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {r.donationStatus}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 font-bold text-lg">
                      {r.bloodGroup}
                    </div>
                    <div className="text-sm text-gray-500">Blood Type</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-600 w-24">
                      Requester:
                    </span>
                    <span className="text-gray-800">{r.requesterName}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-600 w-24">
                      Email:
                    </span>
                    <span className="text-gray-800 text-sm">
                      {r.requesterEmail}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-600 w-24">
                      Recipient:
                    </span>
                    <span className="text-gray-800">{r.recipientName}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-600 w-24">
                      District:
                    </span>
                    <span className="text-gray-800">{r.recipientDistrict}</span>
                  </div>
                </div>

                {r.donationStatus === "inprogress" && (
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEdit className="text-xs" />
                      <Link to={`/dashboard/manage-donation-request/${r._id}`}>
                        Edit
                      </Link>
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(r._id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTrash className="text-xs" />
                      Delete
                    </motion.button>
                    <motion.button
                      className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEye className="text-xs" />
                      <Link to={`/dashboard/donation-request-details/${r._id}`}>
                        View
                      </Link>
                    </motion.button>
                    <motion.button
                      onClick={() => handleDone(r._id)}
                      className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaCheck className="text-xs" />
                      Done
                    </motion.button>
                    <motion.button
                      onClick={() => handleCancel(r._id)}
                      className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTimes className="text-xs" />
                      Cancel
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Smart Pagination */}
        {totalRequest > 10 && (
          <motion.div
            className="flex justify-center mt-8 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
              <motion.button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none disabled:bg-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ‹
              </motion.button>

              {getVisiblePages().map((page, index) => (
                <motion.button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page - 1)
                  }
                  disabled={page === "..."}
                  className={`btn btn-sm ${
                    page === currentPage + 1
                      ? "bg-red-600 text-white"
                      : page === "..."
                      ? "bg-transparent text-gray-500 cursor-default"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  } border-none`}
                  whileHover={page !== "..." ? { scale: 1.05 } : {}}
                  whileTap={page !== "..." ? { scale: 0.95 } : {}}
                >
                  {page}
                </motion.button>
              ))}

              <motion.button
                disabled={currentPage === totalPage - 1}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none disabled:bg-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ›
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MyDonationRequests;
