import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useRole from "../../Hooks/useRole";
import { CircleDollarSign, HeartPulse, Syringe } from "lucide-react";
import Loading from "../../Components/Loading";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTint,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaPlus,
  FaHeart,
  FaUsers,
  FaDollarSign,
  FaClipboardList,
} from "react-icons/fa";

const Dashboard = () => {
  const { role } = useRole();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //user indevitual data for WELCOMING
  const { data: userData = {} } = useQuery({
    queryKey: ["users-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-profile?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDone = (id) => {
    // Update the donation request status to "done"
    const updateInfo = { donationStatus: "done" };
    axiosSecure.patch(`/donation-requests/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast("Donation request marked as done.");

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

  //Dashboard এ admin এর অংশ এখানে
  const { data: donors = [], isLoading } = useQuery({
    queryKey: ["donor"], //backend theke je data antesi.. sei data Key hisebe bosbe
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?role=donor`);
      return res.data;
    },
  });

  const { data: totalReq = [] } = useQuery({
    queryKey: ["total-donation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-donation");
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const totalAmount = payments.reduce((sum, i) => sum + i.amount, 0);

  const hasInProgress = requests?.some(
    (r) => r.donationStatus === "inprogress",
  );

  // Chart Data Preparation
  const statusStats = [
    {
      name: "Pending",
      value: totalReq.filter((r) => r.donationStatus === "pending").length,
      color: "#FACC15",
    },
    {
      name: "In Progress",
      value: totalReq.filter((r) => r.donationStatus === "inprogress").length,
      color: "#3B82F6",
    },
    {
      name: "Done",
      value: totalReq.filter((r) => r.donationStatus === "done").length,
      color: "#22C55E",
    },
    {
      name: "Cancelled",
      value: totalReq.filter((r) => r.donationStatus === "cancelled").length,
      color: "#9CA3AF",
    },
  ].filter((item) => item.value > 0);

  const bloodGroupStats = donors
    .reduce((acc, donor) => {
      const group = donor.bloodGroup;
      if (!group) return acc;
      const existing = acc.find((item) => item.name === group);
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({ name: group, value: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => b.value - a.value);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
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

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-2">
            Welcome back,
            <span className="bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent ml-2">
              {userData?.displayName}
            </span>
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Manage your donation requests and track your impact in saving lives
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Dashboard এ donor এর অংশ এখানে  */}
        {role === "donor" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {requests.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🩸</div>
                <h3 className="text-2xl font-semibold text-base-content/70 mb-2">
                  No Donation Requests
                </h3>
                <p className="text-base-content/50 mb-6">
                  You haven't created any donation requests yet.
                </p>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 inline-flex items-center space-x-2"
                >
                  <Link to="/dashboard/create-donation-request" className="flex items-center">
                    <FaPlus />
                    <span>Create Your First Request</span>
                  </Link>
                </motion.button>
              </motion.div>
            ) : (
              <>
                {/* Requests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {requests?.map((request, i) => (
                    <motion.div
                      key={request._id}
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(239, 68, 68, 0.15)",
                      }}
                      className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300"
                    >
                      {/* Card Header */}
                      <div className="bg-linear-to-r from-red-500 to-red-600 p-4 text-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FaHeart className="text-lg" />
                            <span className="font-semibold">
                              Request #{i + 1}
                            </span>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.donationStatus === "pending"
                                ? "bg-yellow-400 text-yellow-900"
                                : request.donationStatus === "inprogress"
                                  ? "bg-blue-400 text-blue-900"
                                  : request.donationStatus === "done"
                                    ? "bg-green-400 text-green-900"
                                    : "bg-gray-400 text-gray-900"
                            }`}
                          >
                            {request.donationStatus}
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-4">
                        {/* Recipient Info */}
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-linear-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center">
                            <FaUser className="text-white text-sm" />
                          </div>
                          <div>
                            <p className="text-sm text-base-content/60 font-medium">
                              Recipient
                            </p>
                            <p className="text-base-content font-semibold">
                              {request.recipientName}
                            </p>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center space-x-2 text-base-content/70">
                          <FaMapMarkerAlt className="text-red-500" />
                          <span className="text-sm">
                            {request.recipientDistrict},{" "}
                            {request.recipientUpazila}
                          </span>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-red-500" />
                            <div>
                              <p className="text-xs text-base-content/50">
                                Date
                              </p>
                              <p className="text-sm font-semibold">
                                {request.donationDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaClock className="text-red-500" />
                            <div>
                              <p className="text-xs text-base-content/50">
                                Time
                              </p>
                              <p className="text-sm font-semibold">
                                {request.donationTime}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Blood Group */}
                        <div className="bg-red-50/10 rounded-xl p-3">
                          <div className="flex items-center space-x-2">
                            <FaTint className="text-red-500" />
                            <span className="text-red-600 font-bold">
                              {request.bloodGroup}
                            </span>
                          </div>
                        </div>

                        {/* Requester Info (only for inprogress) */}
                        {request.donationStatus === "inprogress" && (
                          <div className="bg-blue-50/10 rounded-xl p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <FaUser className="text-blue-500" />
                              <span className="text-sm font-medium text-blue-700">
                                Requester
                              </span>
                            </div>
                            <p className="text-sm text-base-content/80">
                              {request.requesterName}
                            </p>
                            <p className="text-xs text-base-content/50">
                              {request.requesterEmail}
                            </p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="w-full bg-base-200 hover:bg-base-300 text-base-content font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <FaEye />
                            <Link
                              to={`/dashboard/donation-request-details/${request._id}`}
                            >
                              <span>View Details</span>
                            </Link>
                          </motion.button>

                          {request.donationStatus === "inprogress" && (
                            <div className="grid grid-cols-2 gap-2">
                              <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-1 text-sm"
                              >
                                <FaEdit />
                                <Link
                                  to={`/dashboard/manage-donation-request/${request._id}`}
                                >
                                  <span>Edit</span>
                                </Link>
                              </motion.button>

                              <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => handleDone(request._id)}
                                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-1 text-sm"
                              >
                                <FaCheck />
                                <span>Done</span>
                              </motion.button>

                              <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => handleCancel(request._id)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-1 text-sm"
                              >
                                <FaTimes />
                                <span>Cancel</span>
                              </motion.button>

                              <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => handleDelete(request._id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-1 text-sm"
                              >
                                <FaTrash />
                                <span>Delete</span>
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View All Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <FaClipboardList />
                    <Link to="/dashboard/my-donation-requests">
                      <span>View All My Requests</span>
                    </Link>
                  </motion.button>
                </motion.div>
              </>
            )}
          </motion.div>
        )}

        {/* Dashboard এ admin এর অংশ এখানে  */}
        {(role === "admin" || role === "volunteer") && (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Total Donors */}
              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.15)",
                }}
                className="bg-base-100 rounded-2xl shadow-xl p-8 border border-base-300 text-center"
              >
                <div className="bg-linear-to-r from-red-400 to-red-500 p-4 flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-4">
                  <FaUsers className="text-white text-3xl" />
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-red-600 mb-2">
                  {donors.length}
                </h2>
                <h3 className="text-lg font-semibold text-base-content/70">
                  Total Donor Users
                </h3>
                <p className="text-sm text-base-content/50 mt-2">
                  Active blood donors in our community
                </p>
              </motion.div>

              {/* Total Funding */}
              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.15)",
                }}
                className="bg-base-100 rounded-2xl shadow-xl p-8 border border-base-300 text-center"
              >
                <div className="bg-linear-to-r from-green-400 to-green-500 p-4 flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-4">
                  <FaDollarSign className="text-white text-3xl" />
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-600 mb-2">
                  ${totalAmount}
                </h2>
                <h3 className="text-lg font-semibold text-base-content/70">
                  Total Funding Raised
                </h3>
                <p className="text-sm text-base-content/50 mt-2">
                  Contributions supporting our mission
                </p>
              </motion.div>

              {/* Total Requests */}
              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.15)",
                }}
                className="bg-base-100 rounded-2xl shadow-xl p-8 border border-base-300 text-center"
              >
                <div className="bg-linear-to-r from-blue-400 to-blue-500 p-4 flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-4">
                  <FaClipboardList className="text-white text-3xl" />
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600 mb-2">
                  {totalReq.length}
                </h2>
                <h3 className="text-lg font-semibold text-base-content/70">
                  Blood Donation Requests
                </h3>
                <p className="text-sm text-base-content/50 mt-2">
                  Active requests waiting for donors
                </p>
              </motion.div>
            </motion.div>

            {/* Charts Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8"
            >
              {/* Donation Status Chart */}
              <motion.div
                variants={cardVariants}
                className="bg-base-100 rounded-2xl shadow-xl p-8 border border-base-300 flex flex-col items-center"
              >
                <h3 className="text-xl font-bold text-base-content mb-6">
                  Donation Status Distribution
                </h3>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Blood Group Distribution Chart */}
              <motion.div
                variants={cardVariants}
                className="bg-base-100 rounded-2xl shadow-xl p-8 border border-base-300 flex flex-col items-center"
              >
                <h3 className="text-xl font-bold text-base-content mb-6">
                  Donor Blood Group Distribution
                </h3>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={bloodGroupStats}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#E5E7EB"
                      />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <RechartsTooltip cursor={{ fill: "#FEF2F2" }} />
                      <Bar
                        dataKey="value"
                        fill="#EF4444"
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
