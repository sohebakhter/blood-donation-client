import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaTint,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaHospital,
  FaComment,
  FaPaperPlane,
  FaHeart,
} from "react-icons/fa";

const CreateDonationRequest = () => {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const { user } = useAuth();
  // console.log("user--------", user);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const realData = useLoaderData();

  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log("upazila data", data);
        setUpazilas(data); //upazilas একটি array
      })
      .catch((err) => console.log(err));
  }, []);

  const selectedDistrict = useWatch({ control, name: "recipientDistrict" });

  const upazilaByDistrictId = (districtId) => {
    const districtUpazilas = upazilas.filter(
      (u) => u.district_id === districtId
    );
    const upazilasName = districtUpazilas.map((u) => u.name);
    return upazilasName;
  };

  const onSubmit = (data) => {
    // get district name from id (important)
    const districtName = realData.find((d) => d.id === data.recipientDistrict);

    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.recipientName,
      recipientDistrict: districtName?.name,
      recipientUpazila: data.recipientUpazila,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      donationStatus: "pending",
    };
    // console.log(requestData);
    axiosSecure
      .post("/donation-requests", requestData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("donation request create successfully");
          reset();
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast.error(message);
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
    <motion.div
      className="min-h-screen bg-base-200 py-8 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
            Create Donation Request
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Fill out the form below to create a new blood donation request and
            help save lives
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={cardVariants}
          className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300"
        >
          {/* Card Header */}
          <div className="bg-linear-to-r from-red-500 to-red-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <FaHeart className="text-2xl" />
              <h2 className="text-2xl font-bold">Request Details</h2>
            </div>
            <p className="text-red-100 mt-2">
              Please provide accurate information to ensure successful donation
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {/* Requester Information */}
            <motion.div
              variants={cardVariants}
              className="bg-base-200 rounded-xl p-6 border border-base-300"
            >
              <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center space-x-2">
                <FaUser className="text-red-500" />
                <span>Requester Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-medium mb-2 text-base-content/70 flex items-center space-x-2">
                    <FaUser className="text-red-500 text-sm" />
                    <span>Requester Name</span>
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="p-3 rounded-lg bg-base-100 border border-base-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium mb-2 text-base-content/70 flex items-center space-x-2">
                    <FaEnvelope className="text-red-500 text-sm" />
                    <span>Requester Email</span>
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="p-3 rounded-lg bg-base-100 border border-base-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                  />
                </div>
              </div>
            </motion.div>

            {/* Recipient Information */}
            <motion.div
              variants={cardVariants}
              className="bg-base-200 rounded-xl p-6 border border-base-300"
            >
              <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center space-x-2">
                <FaTint className="text-blue-500" />
                <span>Recipient Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-medium mb-2 text-base-content/70">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    {...register("recipientName", { required: true })}
                    className="p-3 rounded-lg bg-base-100 border border-base-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Enter recipient name"
                  />
                  {errors.recipientName && (
                    <p className="text-red-500 text-sm mt-1">
                      Recipient name is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="font-medium mb-2 text-base-content/70 flex items-center space-x-2">
                    <FaTint className="text-red-500 text-sm" />
                    <span>Blood Group</span>
                  </label>
                  <select
                    {...register("bloodGroup", { required: true })}
                    className="p-3 rounded-lg bg-base-100 border border-base-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((bg, i) => (
                      <option key={i} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                  {errors.bloodGroup && (
                    <p className="text-red-500 text-sm mt-1">
                      Blood group is required
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Location Information */}
            <motion.div
              variants={cardVariants}
              className="bg-base-200 rounded-xl p-6 border border-base-300"
            >
              <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center space-x-2">
                <FaMapMarkerAlt className="text-green-500" />
                <span>Location Details</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-medium mb-2 text-base-content/70">
                    District
                  </label>
                  <select
                    {...register("recipientDistrict", { required: true })}
                    className="p-3 rounded-lg bg-base-100 border border-base-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  >
                    <option value="pick a District">Select District</option>
                    {realData.map((d, i) => (
                      <option key={i} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  {errors.recipientDistrict && (
                    <p className="text-red-500 text-sm mt-1">
                      District is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="font-medium mb-2 text-base-content/70">
                    Upazila
                  </label>
                  <select
                    {...register("recipientUpazila", { required: true })}
                    className="p-3 rounded-lg bg-base-100 border border-base-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  >
                    <option value="pick a Upazila">Select Upazila</option>
                    {upazilaByDistrictId(selectedDistrict).map((u, i) => (
                      <option key={i} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                  {errors.recipientUpazila && (
                    <p className="text-red-500 text-sm mt-1">
                      Upazila is required
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Schedule Information */}
            <motion.div
              variants={cardVariants}
              className="bg-base-200 rounded-xl p-6 border border-base-300"
            >
              <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center space-x-2">
                <FaCalendarAlt className="text-purple-500" />
                <span>Donation Schedule</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-medium mb-2 text-base-content/70 flex items-center space-x-2">
                    <FaCalendarAlt className="text-purple-500 text-sm" />
                    <span>Donation Date</span>
                  </label>
                  <input
                    type="date"
                    {...register("donationDate", { required: true })}
                    className="p-3 rounded-lg bg-base-100 border border-base-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                  {errors.donationDate && (
                    <p className="text-red-500 text-sm mt-1">
                      Donation date is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="font-medium mb-2 text-base-content/70 flex items-center space-x-2">
                    <FaClock className="text-purple-500 text-sm" />
                    <span>Donation Time</span>
                  </label>
                  <input
                    type="time"
                    {...register("donationTime", { required: true })}
                    className="p-3 rounded-lg bg-base-100 border border-base-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                  {errors.donationTime && (
                    <p className="text-red-500 text-sm mt-1">
                      Donation time is required
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Hospital Information */}
            <motion.div
              variants={cardVariants}
              className="bg-base-200 rounded-xl p-6 border border-base-300"
            >
              <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center space-x-2">
                <FaHospital className="text-teal-500" />
                <span>Hospital Details</span>
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="font-medium mb-2 text-base-content/70">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    {...register("hospitalName", { required: true })}
                    className="p-3 rounded-lg bg-base-100 border border-base-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                    placeholder="Enter hospital name"
                  />
                  {errors.hospitalName && (
                    <p className="text-red-500 text-sm mt-1">
                      Hospital name is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="font-medium mb-2 text-base-content/70">
                    Full Address
                  </label>
                  <input
                    type="text"
                    {...register("fullAddress", { required: true })}
                    className="p-3 rounded-lg bg-base-100 border border-base-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                    placeholder="Enter complete address"
                  />
                  {errors.fullAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      Full address is required
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Request Message */}
            <motion.div
              variants={cardVariants}
              className="bg-base-200 rounded-xl p-6 border border-base-300"
            >
              <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center space-x-2">
                <FaComment className="text-yellow-500" />
                <span>Request Message</span>
              </h3>
              <div className="flex flex-col">
                <label className="font-medium mb-2 text-base-content/70">
                  Why is blood needed?
                </label>
                <textarea
                  {...register("requestMessage", { required: true })}
                  rows="4"
                  className="p-3 rounded-lg bg-base-100 border border-base-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all resize-none"
                  placeholder="Please provide details about why blood donation is needed..."
                />
                {errors.requestMessage && (
                  <p className="text-red-500 text-sm mt-1">
                    Request message is required
                  </p>
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={cardVariants}
              className="flex justify-center pt-6"
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                type="submit"
                className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl text-lg"
              >
                <FaPaperPlane />
                <span>Create Donation Request</span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreateDonationRequest;
