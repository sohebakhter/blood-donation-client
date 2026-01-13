import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaTint,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaCamera,
  FaUserCircle,
  FaIdCard,
  FaMapPin,
} from "react-icons/fa";

const ProfilePage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const [editable, setEditable] = useState(false);

  // Fetch Single User Data
  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["users-profile", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-profile?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // React Hook Form
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (editable && userData?._id) {
      reset({
        displayName: userData?.displayName || "",
        bloodGroup: userData?.bloodGroup || "",
        district: userData?.district || "",
        upazila: userData?.upazila || "",
      });
    }
  }, [editable, userData, reset]);

  // Update Profile
  const onSubmit = (data) => {
    const updatedData = {
      displayName: data.displayName,
      bloodGroup: data.bloodGroup,
      district: data.district,
      upazila: data.upazila,
    };
    console.log(updatedData);
    axiosSecure
      .patch(`/user-profile/${userData?._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success("Profile updated successfully");
          setEditable(false);
        }
      });
  };

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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your personal information and keep your profile up to date
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Profile Avatar Card */}
          <motion.div variants={cardVariants} className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-linear-to-r from-blue-500 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-white p-1">
                    {userData?.photoURL ? (
                      <img
                        src={userData.photoURL}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                        <FaUserCircle className="text-4xl text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-0 right-1/2 transform translate-x-16 bg-white rounded-full p-2 shadow-lg border border-gray-200">
                  <FaCamera className="text-gray-600 text-sm" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {userData?.displayName || "User"}
              </h3>
              <p className="text-gray-600 text-sm mb-4">Blood Donor</p>

              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <FaTint className="text-red-500" />
                  <span className="font-semibold text-red-600">
                    {userData?.bloodGroup || "Not set"}
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span>
                    {userData?.district && userData?.upazila
                      ? `${userData.district}, ${userData.upazila}`
                      : "Location not set"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Form Card */}
          <motion.div variants={cardVariants} className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
              {/* Card Header */}
              <div className="bg-linear-to-r from-blue-500 to-purple-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaIdCard className="text-2xl" />
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                  </div>

                  {!editable ? (
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-300"
                      onClick={() => setEditable(true)}
                    >
                      <FaEdit />
                      <span>Edit Profile</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-300"
                      onClick={handleSubmit(onSubmit)}
                    >
                      <FaSave />
                      <span>Save Changes</span>
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <form className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label font-semibold text-gray-700 flex items-center space-x-2">
                        <FaUser className="text-blue-500" />
                        <span>Full Name</span>
                      </label>
                      <input
                        type="text"
                        {...register("displayName")}
                        defaultValue={userData.displayName}
                        disabled={!editable}
                        className={`input input-bordered w-full transition-all duration-300 ${
                          editable
                            ? "border-blue-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
                            : "bg-gray-50 border-gray-200 cursor-not-allowed"
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="label font-semibold text-gray-700 flex items-center space-x-2">
                        <FaEnvelope className="text-purple-500" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        value={userData?.email || ""}
                        disabled
                        className="input input-bordered w-full bg-gray-50 border-gray-200 cursor-not-allowed"
                        placeholder="Email address"
                      />
                      <p className="text-xs text-gray-500">
                        Email cannot be changed
                      </p>
                    </div>
                  </div>

                  {/* Blood Group and District Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label font-semibold text-gray-700 flex items-center space-x-2">
                        <FaTint className="text-red-500" />
                        <span>Blood Group</span>
                      </label>
                      <select
                        {...register("bloodGroup")}
                        defaultValue={userData.bloodGroup}
                        disabled={!editable}
                        className={`select select-bordered w-full transition-all duration-300 ${
                          editable
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500 bg-white"
                            : "bg-gray-50 border-gray-200 cursor-not-allowed"
                        }`}
                      >
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (grp) => (
                            <option key={grp} value={grp}>
                              {grp}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="label font-semibold text-gray-700 flex items-center space-x-2">
                        <FaMapPin className="text-green-500" />
                        <span>District</span>
                      </label>
                      <input
                        type="text"
                        {...register("district")}
                        defaultValue={userData.district}
                        disabled={!editable}
                        className={`input input-bordered w-full transition-all duration-300 ${
                          editable
                            ? "border-green-300 focus:border-green-500 focus:ring-green-500 bg-white"
                            : "bg-gray-50 border-gray-200 cursor-not-allowed"
                        }`}
                        placeholder="Enter your district"
                      />
                    </div>
                  </div>

                  {/* Upazila Row */}
                  <div className="space-y-2">
                    <label className="label font-semibold text-gray-700 flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-orange-500" />
                      <span>Upazila</span>
                    </label>
                    <input
                      type="text"
                      {...register("upazila")}
                      defaultValue={userData.upazila}
                      disabled={!editable}
                      className={`input input-bordered w-full transition-all duration-300 ${
                        editable
                          ? "border-orange-300 focus:border-orange-500 focus:ring-orange-500 bg-white"
                          : "bg-gray-50 border-gray-200 cursor-not-allowed"
                      }`}
                      placeholder="Enter your upazila"
                    />
                  </div>
                </form>

                {/* Edit Mode Indicator */}
                {editable && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
                  >
                    <div className="flex items-center space-x-2 text-blue-700">
                      <FaEdit className="animate-pulse" />
                      <span className="font-medium">Edit Mode Active</span>
                    </div>
                    <p className="text-sm text-blue-600 mt-1">
                      Make your changes and click "Save Changes" to update your
                      profile.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
