import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaTint,
  FaMapMarkerAlt,
  FaCity,
  FaCheckCircle,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser } = useAuth();
  const [upazilas, setUpazilas] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const realData = useLoaderData();

  useEffect(() => {
    fetch("./upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data))
      .catch((err) => console.log(err));
  }, []);

  const selectedDistrict = useWatch({ control, name: "district" });

  const upazilaByDistrictId = (districtId) => {
    const districtUpazilas = upazilas.filter(
      (u) => u.district_id === districtId
    );
    return districtUpazilas.map((u) => u.name);
  };

  const handleRegister = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    const profielImg = data.photo[0];
    const districtName = realData.find((d) => d.id === data.district);

    createUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profielImg);

        const imageapiURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(imageapiURL, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userInfo = {
            displayName: data.name,
            photoURL,
            email: data.email,
            bloodGroup: data.bloodGroup,
            district: districtName.name,
            upazila: data.upazila,
            status: "active",
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) console.log("user added to database");
          });

          const userProfile = { displayName: data.name, photoURL };
          updateUser(userProfile)
            .then(() => {
              toast.success("Registration Successful, Updated your profile");
              navigate(location?.state || "/");
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-white py-8"
    >
      {/* Hero Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 mb-8"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FaHeart className="text-3xl text-white" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Join RedLove Community
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-red-100 max-w-2xl mx-auto"
          >
            Create your account and become part of a life-saving community
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        <motion.form
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-8"
        >
          {/* Main Form Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
              <h2 className="text-2xl font-bold text-white text-center">
                Create Your Account
              </h2>
            </div>

            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="space-y-6"
                >
                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaEnvelope className="text-red-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <FaCheckCircle className="text-xs" />
                        Email is required
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaUser className="text-red-500" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <FaCheckCircle className="text-xs" />
                        Name is required
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaLock className="text-red-500" />
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Create a strong password"
                    />
                    {errors.password?.type === "required" && (
                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <FaCheckCircle className="text-xs" />
                        Password is required
                      </motion.p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <FaCheckCircle className="text-xs" />
                        Password must be at least 6 characters
                      </motion.p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <FaCheckCircle className="text-xs" />
                        Password must include uppercase, lowercase, and special
                        character
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Confirm Password */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaLock className="text-red-500" />
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: true,
                        minLength: 6,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Confirm your password"
                    />
                  </motion.div>
                </motion.div>

                {/* Right Column */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="space-y-6"
                >
                  {/* Photo */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaCamera className="text-red-500" />
                      Profile Photo
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        {...register("photo", { required: true })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 hover:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                      />
                    </div>
                    {errors.photo && (
                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <FaCheckCircle className="text-xs" />
                        Profile photo is required
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Blood Group */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaTint className="text-red-500" />
                      Blood Group
                    </label>
                    <select
                      defaultValue=""
                      {...register("bloodGroup", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                    >
                      <option value="" disabled>
                        Select your blood group
                      </option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (b, i) => (
                          <option key={i} value={b}>
                            {b}
                          </option>
                        )
                      )}
                    </select>
                  </motion.div>

                  {/* District */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaMapMarkerAlt className="text-red-500" />
                      District
                    </label>
                    <select
                      defaultValue=""
                      {...register("district", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                    >
                      <option value="" disabled>
                        Select your district
                      </option>
                      {realData.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Upazila */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaCity className="text-red-500" />
                      Upazila
                    </label>
                    <select
                      defaultValue=""
                      {...register("upazila", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                    >
                      <option value="" disabled>
                        Select your upazila
                      </option>
                      {upazilaByDistrictId(selectedDistrict).map((u, i) => (
                        <option key={i} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="mt-8"
              >
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Create Account
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="text-center"
          >
            <Link
              to="/login"
              state={location?.state}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <span>Already have an account?</span>
              <span className="font-semibold text-red-600 hover:text-red-700">
                Sign In Here
              </span>
            </Link>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Register;
