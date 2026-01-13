import React, { useRef, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import { motion } from "framer-motion";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaUser,
  FaPlus,
  FaCreditCard,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaMoneyBillWave,
} from "react-icons/fa";

const Funding = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();

  const [totalRequest, setTotalRequest] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 12;

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["all-payments", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-payments?limit=${limit}&skip=${currentPage * limit}`
      );
      setTotalRequest(res.data.total);
      const page = Math.ceil(res.data.total / limit);
      setTotalPage(page);
      return res.data.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  console.log(totalRequest);

  const handlePayment = (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;

    const paymentInfo = {
      senderName: user?.displayName,
      senderEmail: user?.email,
      amount: Number(amount),
      parcelName: "Funding Amount",
    };

    axiosSecure.post("/create-checkout-session", paymentInfo).then((res) => {
      window.location.assign(res.data.url);
    });
  };

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
            Funding History
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Track your generous contributions and help us save more lives
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-base-100 rounded-xl shadow-lg p-4 border border-base-300">
              <div className="flex items-center space-x-2">
                <FaMoneyBillWave className="text-red-500 text-xl" />
                <div>
                  <p className="text-sm text-base-content/60 font-medium">
                    Total Donations
                  </p>
                  <p className="text-xl font-bold text-red-600">
                    {totalRequest}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => modalRef.current.showModal()}
            className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <FaPlus />
            <span>Give Fund</span>
          </motion.button>
        </motion.div>

        {/* Payments Grid */}
        {payments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">💝</div>
            <h3 className="text-2xl font-semibold text-base-content/70 mb-2">
              No Donations Yet
            </h3>
            <p className="text-base-content/50 mb-6">
              Be the first to make a difference!
            </p>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => modalRef.current.showModal()}
              className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 inline-flex items-center space-x-2"
            >
              <FaHeart />
              <span>Make Your First Donation</span>
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {payments.map((payment, i) => (
                <motion.div
                  key={payment._id}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 20px 40px rgba(239, 68, 68, 0.15)",
                  }}
                  className="bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-300"
                >
                  {/* Card Header */}
                  <div className="bg-linear-to-r from-red-500 to-red-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FaCreditCard className="text-lg" />
                        <span className="font-semibold">
                          Donation #{currentPage * limit + i + 1}
                        </span>
                      </div>
                      <div className="bg-white/20 px-2 py-1 rounded-full">
                        <span className="text-xs font-medium">Completed</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    {/* Donor Info */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-linear-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center">
                        <FaUser className="text-white text-sm" />
                      </div>
                      <div>
                        <p className="text-sm text-base-content/60 font-medium">
                          Donor
                        </p>
                        <p className="text-base-content font-semibold">
                          {payment.senderName}
                        </p>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="bg-base-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FaDollarSign className="text-red-500" />
                          <span className="text-sm text-base-content/70 font-medium">
                            Amount
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-red-600">
                          ${payment.amount}
                        </span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center space-x-2 text-base-content/70">
                      <FaCalendarAlt className="text-red-500" />
                      <span className="text-sm">
                        {new Date(payment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-base-100 rounded-2xl shadow-xl p-6 border border-base-300"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-sm text-base-content/70">
                  Showing {currentPage * limit + 1} to{" "}
                  {Math.min((currentPage + 1) * limit, totalRequest)} of{" "}
                  {totalRequest} donations
                </div>

                <div className="flex items-center space-x-2">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl"
                      }`}
                  >
                    <FaChevronLeft />
                    <span>Previous</span>
                  </motion.button>

                  <div className="flex items-center space-x-1">
                    {[...Array(totalPage).keys()].map((i) => (
                      <motion.button
                        key={i}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => setCurrentPage(i)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${i === currentPage
                            ? "bg-linear-to-r from-red-500 to-red-600 text-white shadow-lg"
                            : "bg-base-200 text-base-content hover:bg-base-300"
                          }`}
                      >
                        {i + 1}
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={currentPage === totalPage - 1}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === totalPage - 1
                        ? "bg-base-200 text-base-content/30 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl"
                      }`}
                  >
                    <span>Next</span>
                    <FaChevronRight />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Modal - Keeping original functionality */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-bold text-2xl text-center mb-6 bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent flex items-center justify-center space-x-2">
                <FaHeart className="text-red-500" />
                <span>Make a Donation</span>
              </h3>

              <form onSubmit={handlePayment} className="space-y-4">
                <div className="bg-base-200 rounded-xl p-6 border border-base-300">
                  <label className="label font-semibold text-base-content">
                    <span className="label-text flex items-center space-x-2">
                      <FaDollarSign className="text-red-500" />
                      <span>Donation Amount</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="amount"
                      className="input input-bordered w-full pl-10 bg-base-100 border-base-300 focus:border-red-500 focus:ring-red-500 text-base-content"
                      placeholder="Enter amount in USD"
                      required
                      min="1"
                    />
                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                  </div>
                  <p className="text-xs text-base-content/50 mt-2">
                    Minimum donation amount is $1
                  </p>
                </div>

                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  type="submit"
                  className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <FaCreditCard />
                  <span>Proceed to Payment</span>
                </motion.button>
              </form>

              <div className="modal-action mt-6">
                <form method="dialog">
                  <button className="btn btn-outline border-base-300 hover:bg-base-200 text-base-content">
                    Cancel
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Funding;
