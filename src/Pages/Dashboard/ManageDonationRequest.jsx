import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { motion } from "framer-motion";

const ManageDonationRequest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  //get the donation request details using the id param and allow admin to manage it
  const { data: realData = {} } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });
  const {
    recipientName,
    recipientDistrict,
    recipientUpazila,
    hospitalName,
    fullAddress,
    donationStatus,
  } = realData || {};
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (realData && Object.keys(realData).length > 0) {
      reset({
        recipientName: realData.recipientName,
        recipientDistrict: realData.recipientDistrict,
        recipientUpazila: realData.recipientUpazila,
        hospitalName: realData.hospitalName,
        fullAddress: realData.fullAddress,
      });
    }
  }, [realData, reset]);

  //update request data
  const onSubmit = (data) => {
    const updatedInfo = {
      recipientName: data.recipientName,
      recipientDistrict: data.recipientDistrict,
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      donationStatus: donationStatus,
    };
    console.log("eije data", updatedInfo);
    axiosSecure
      .patch(`/update-donation-request/${id}`, updatedInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Requested Data Updated");
        }
      });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
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
    <div className="min-h-screen bg-base-200 py-12 px-4 flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl bg-base-100/80 backdrop-blur-md rounded-2xl shadow-xl border border-base-300 p-8"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-center text-base-content mb-2"
        >
          Edit Donation Request
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-center text-base-content/70 mb-8"
        >
          Update the details for this blood donation request
        </motion.p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* recipientName */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-base-content/70 ml-1">
                Recipient Name
              </label>
              <input
                type="text"
                defaultValue={recipientName}
                {...register("recipientName")}
                className="input input-bordered w-full bg-base-100 border-base-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 rounded-xl"
                placeholder="Enter recipient name"
              />
            </motion.div>

            {/* recipientDistrict */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-base-content/70 ml-1">
                Recipient District
              </label>
              <input
                type="text"
                defaultValue={recipientDistrict}
                {...register("recipientDistrict")}
                className="input input-bordered w-full bg-base-100 border-base-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 rounded-xl"
                placeholder="Enter district"
              />
            </motion.div>

            {/* recipientUpazila */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-base-content/70 ml-1">
                Recipient Upazila
              </label>
              <input
                type="text"
                defaultValue={recipientUpazila}
                {...register("recipientUpazila")}
                className="input input-bordered w-full bg-base-100 border-base-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 rounded-xl"
                placeholder="Enter upazila"
              />
            </motion.div>

            {/* hospitalName */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-base-content/70 ml-1">
                Hospital Name
              </label>
              <input
                type="text"
                defaultValue={hospitalName}
                {...register("hospitalName")}
                className="input input-bordered w-full bg-base-100 border-base-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 rounded-xl"
                placeholder="Enter hospital name"
              />
            </motion.div>

            {/* fullAddress - full width */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-base-content/70 ml-1">
                Full Address
              </label>
              <input
                type="text"
                defaultValue={fullAddress}
                {...register("fullAddress")}
                className="input input-bordered w-full bg-base-100 border-base-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 rounded-xl"
                placeholder="Enter full address"
              />
            </motion.div>

            {/* submit */}
            <motion.div variants={itemVariants} className="md:col-span-2 flex justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn border-none bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-12 py-3 rounded-xl text-lg shadow-lg hover:shadow-red-500/30 transition-all duration-300"
              >
                Update Request
              </motion.button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ManageDonationRequest;
