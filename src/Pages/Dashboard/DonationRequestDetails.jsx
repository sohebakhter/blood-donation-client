import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";
import { motion } from "framer-motion";
import {
  FaUser,
  FaUserMd,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTint,
  FaHospital,
  FaComment,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHeart,
  FaHandHoldingHeart,
} from "react-icons/fa";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const openModal = useRef();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["donation-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });

  const handleModal = () => {
    openModal.current.showModal();
  };

  const handleConfirmDonate = (e) => {
    e.preventDefault();
    const updatedInfo = { donationStatus: "inprogress" };
    axiosSecure.patch(`/donation-requests/${id}`, updatedInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount || res.data.matchedCount) {
        toast.success("Donation In Progress");
        refetch();
        openModal.current.close();
      }
    });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
            Donation Request Details
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review the complete details and help save a life by donating blood
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Details Card */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-red-100"
          >
            {/* Card Header */}
            <div className="bg-linear-to-r from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center space-x-3 mb-2">
                <FaHeart className="text-2xl" />
                <h2 className="text-2xl font-bold">Request Information</h2>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    data?.donationStatus === "pending"
                      ? "bg-yellow-400 animate-pulse"
                      : "bg-green-400"
                  }`}
                ></div>
                <span className="text-sm font-medium capitalize">
                  {data?.donationStatus}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-6">
              {/* Requester & Recipient Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <FaUser className="text-red-500 text-lg" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Requester
                    </h3>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {data?.requesterName}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <FaUserMd className="text-red-500 text-lg" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Recipient
                    </h3>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {data?.recipientName}
                  </p>
                </div>
              </div>

              {/* Location & Blood Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                  <FaMapMarkerAlt className="text-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      District
                    </p>
                    <p className="text-gray-700 font-semibold">
                      {data?.recipientDistrict}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
                  <FaMapMarkerAlt className="text-green-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Upazila</p>
                    <p className="text-gray-700 font-semibold">
                      {data?.recipientUpazila}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl">
                  <FaTint className="text-red-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Blood Group
                    </p>
                    <p className="text-red-600 font-bold text-lg">
                      {data?.bloodGroup}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl">
                  <FaCalendarAlt className="text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Donation Date
                    </p>
                    <p className="text-gray-700 font-semibold">
                      {data?.donationDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-xl">
                  <FaClock className="text-indigo-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Donation Time
                    </p>
                    <p className="text-gray-700 font-semibold">
                      {data?.donationTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hospital & Address */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-teal-50 rounded-xl">
                  <FaHospital className="text-teal-500 mt-1 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium">
                      Hospital Name
                    </p>
                    <p className="text-gray-700 font-semibold">
                      {data?.hospitalName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl">
                  <FaMapMarkerAlt className="text-orange-500 mt-1 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium">
                      Full Address
                    </p>
                    <p className="text-gray-700">{data?.fullAddress}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {data?.requestMessage && (
                <div className="bg-yellow-50 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <FaComment className="text-yellow-500 mt-1 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium mb-2">
                        Request Message
                      </p>
                      <p className="text-gray-700 italic">
                        "{data.requestMessage}"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Card */}
          <motion.div variants={cardVariants} className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-red-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <FaExclamationTriangle className="text-yellow-500" />
                <span>Status</span>
              </h3>
              <div
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  data?.donationStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {data?.donationStatus === "pending" ? (
                  <FaExclamationTriangle className="animate-pulse" />
                ) : (
                  <FaCheckCircle />
                )}
                <span className="font-semibold capitalize">
                  {data?.donationStatus}
                </span>
              </div>
            </div>

            {/* Donate Button Card */}
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-xl p-6 border border-red-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <FaHandHoldingHeart className="text-red-500" />
                <span>Take Action</span>
              </h3>
              <p className="text-gray-600 mb-6">
                Ready to save a life? Confirm your donation and help this person
                in need.
              </p>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleModal}
                className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <FaHeart className="text-lg" />
                <span>Donate Blood</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Modal - Keeping original functionality */}
        <dialog ref={openModal} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white shadow-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-bold text-2xl text-center mb-6 bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Confirm Your Donation
              </h3>

              <form>
                <fieldset className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-200">
                  <div>
                    <label className="label font-semibold text-gray-700">
                      <span className="label-text flex items-center space-x-2">
                        <FaUser className="text-red-500" />
                        <span>Name</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full bg-white border-gray-300 focus:border-red-500 focus:ring-red-500"
                      defaultValue={user?.displayName}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="label font-semibold text-gray-700">
                      <span className="label-text flex items-center space-x-2">
                        <FaUserMd className="text-red-500" />
                        <span>Email</span>
                      </span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered w-full bg-white border-gray-300 focus:border-red-500 focus:ring-red-500"
                      defaultValue={user?.email}
                      readOnly
                    />
                  </div>

                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleConfirmDonate}
                    className="btn btn-success w-full mt-4 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-none text-white font-bold py-3 text-lg shadow-lg hover:shadow-xl"
                  >
                    <FaCheckCircle className="mr-2" />
                    Confirm Donation
                  </motion.button>
                </fieldset>
              </form>

              <div className="modal-action mt-6">
                <form method="dialog">
                  <button className="btn btn-outline border-gray-300 hover:bg-gray-100">
                    Close
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

export default DonationRequestDetails;
