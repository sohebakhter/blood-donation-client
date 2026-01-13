import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Loading from "../Components/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaUser, FaMapMarkerAlt, FaTint, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const DonorSearch = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, control } = useForm();
  const [donors, setDonors] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const realData = useLoaderData();
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpazilas(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const selectedDistrict = useWatch({ control, name: "district" });

  const upazilaByDistrictId = (districtId) => {
    const districtUpazilas = upazilas.filter(
      (u) => u.district_id === districtId
    );
    return districtUpazilas.map((u) => u.name);
  };

  const onSearch = async (data) => {
    setIsLoading(true);
    setHasSearched(true);
    const districtName = realData.find((d) => d.id === data.district);

    try {
      const res = await axiosSecure.get("/search-donors", {
        params: {
          bloodGroup: data.bloodGroup,
          district: districtName?.name,
          upazila: data.upazila,
          role: "donor",
        },
      });

      setDonors(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
            Find Blood Donors
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Search for heroes in your area who are ready to save a life.
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Search Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-base-100 rounded-2xl shadow-xl p-8 border border-base-300 mb-12"
        >
          <form
            onSubmit={handleSubmit(onSearch)}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
          >
            {/* Blood Group */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-base-content">Blood Group</span>
              </label>
              <select
                {...register("bloodGroup")}
                className="select select-bordered w-full bg-base-200 focus:border-red-500 focus:ring-red-500"
              >
                <option value="">Select Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-base-content">District</span>
              </label>
              <select
                {...register("district", { required: true })}
                className="select select-bordered w-full bg-base-200 focus:border-red-500 focus:ring-red-500"
                defaultValue="pick a District"
              >
                <option disabled value="pick a District">
                  Select District
                </option>
                {realData.map((d, i) => (
                  <option key={i} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-base-content">Upazila</span>
              </label>
              <select
                {...register("upazila", { required: true })}
                className="select select-bordered w-full bg-base-200 focus:border-red-500 focus:ring-red-500"
                defaultValue="pick a Upazila"
              >
                <option disabled value="pick a Upazila">
                  Select Upazila
                </option>
                {upazilaByDistrictId(selectedDistrict).map((u, i) => (
                  <option key={i} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-none h-[3rem] text-lg shadow-lg hover:shadow-red-500/30"
            >
              <FaSearch className="mr-2" />
              Search Donors
            </motion.button>
          </form>
        </motion.div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <Loading />
            </motion.div>
          ) : (
            <div className="min-h-[200px]">
              {hasSearched && donors.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 bg-base-100 rounded-2xl border border-base-300 border-dashed"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-base-content mb-2">No Donors Found</h3>
                  <p className="text-base-content/70">
                    Try adjusting your search criteria to find available donors.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {donors.map((donor) => (
                    <motion.div
                      key={donor._id}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Card Header */}
                      <div className="bg-linear-to-r from-red-100 to-red-50 p-6 flex justify-between items-start dark:from-red-900/20 dark:to-red-800/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500">
                            <FaUser className="text-xl" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-base-content">{donor.name}</h3>
                            <span className="badge badge-accent badge-sm mt-1 capitalize text-white font-medium">
                              Donor
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 bg-red-100 text-red-600 px-3 py-1 rounded-full dark:bg-red-900/40 dark:text-red-400">
                          <FaTint />
                          <span className="font-bold">{donor.bloodGroup}</span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-start space-x-3 text-base-content/80">
                          <FaMapMarkerAlt className="text-red-500 mt-1 shrink-0" />
                          <div>
                            <p className="text-sm font-medium opacity-70">Location</p>
                            <p className="font-medium">{donor.upazila}, {donor.district}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 text-base-content/80">
                          <FaEnvelope className="text-red-500" />
                          <p className="font-medium truncate">{donor.email}</p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-6 pt-0">
                        <button className="btn w-full bg-black text-white hover:bg-gray-800 border-none rounded-xl dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-md">
                          <FaPhoneAlt className="mr-2 text-sm" />
                          Contact Donor
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DonorSearch;
