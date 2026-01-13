import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useRole from "../../../Hooks/useRole";
import Loading from "../../../Components/Loading";
import { useState } from "react";
import { motion } from "framer-motion";

const AllUsers = () => {
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("all");
  const {
    data: allUser = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  //এখানে ফিলটার করা হচ্ছে (with Status)
  const filteredUsers =
    status === "all" ? allUser : allUser.filter((s) => s.status === status);

  const handleBlock = (id) => {
    // Update the user status to "blocked"
    const updateInfo = { status: "blocked" };
    axiosSecure.patch(`/user-status/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.error("User marked as blocked.");
        // Optionally, refetch the requests or update the local state
        refetch();
      }
    });
  };
  const handleUnBlock = (id) => {
    // Update the user status to "active"
    const updateInfo = { status: "active" };
    axiosSecure.patch(`/user-status/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("User marked as active.");
        // Optionally, refetch the requests or update the local state
        refetch();
      }
    });
  };
  const handleVolunteer = (id) => {
    // Update the user status to "Volunteer"
    const updateInfo = { role: "volunteer" };
    axiosSecure.patch(`/user-role/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("User marked as Volunteer.");
        // Optionally, refetch the requests or update the local state
        refetch();
      }
    });
  };
  const handleAdmin = (id) => {
    // Update the user status to "Admin"
    const updateInfo = { role: "admin" };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user-role/${id}`, updateInfo).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Admin",
              text: "User marked as Admin.",
              icon: "success",
            });
            // Optionally, refetch the requests or update the local state
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6"
    >
      {role === "admin" && (
        <>
          {/* Header Section */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 mb-8"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
                <motion.h1
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent mb-2"
                >
                  All Users
                </motion.h1>
                <motion.p
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-gray-600 text-lg"
                >
                  Manage user accounts, roles, and access permissions
                </motion.p>
              </div>

              {/* Filter Section */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full lg:w-auto"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  className="select select-bordered select-lg w-full lg:w-64 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="all">All Users</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </motion.div>
            </div>
          </motion.div>

          {/* Table Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* Table Head */}
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="text-base font-semibold">#</th>
                    <th className="text-base font-semibold">User</th>
                    <th className="text-base font-semibold">Email</th>
                    <th className="text-base font-semibold">Role</th>
                    <th className="text-base font-semibold">Status</th>
                    <th className="text-base font-semibold">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.05,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        backgroundColor: "#eff6ff",
                        scale: 1.01,
                        transition: { duration: 0.2 },
                      }}
                      className="border-b border-gray-100 hover:shadow-md transition-all duration-200"
                    >
                      <th className="text-base font-medium text-gray-800 py-4">
                        {i + 1}
                      </th>
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="avatar"
                          >
                            <div className="mask mask-squircle h-12 w-12 ring-2 ring-blue-100">
                              <img
                                src={u.photoURL}
                                alt="User Avatar"
                                className="object-cover"
                              />
                            </div>
                          </motion.div>
                          <div>
                            <div className="font-bold text-gray-800 text-base">
                              {u.displayName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-base text-gray-600 py-4">
                        {u.email}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            u.role === "admin"
                              ? "bg-purple-100 text-purple-800 border border-purple-200"
                              : u.role === "volunteer"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-blue-100 text-blue-800 border border-blue-200"
                          }`}
                        >
                          {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                        </span>
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            u.status === "active"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-wrap gap-2">
                          {u.status === "active" && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleBlock(u._id)}
                              className="btn btn-outline btn-error btn-sm hover:bg-red-50 transition-all duration-200"
                            >
                              Block
                            </motion.button>
                          )}
                          {u.status === "blocked" && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleUnBlock(u._id)}
                              className="btn btn-success btn-sm shadow-md hover:shadow-lg transition-all duration-200"
                            >
                              Unblock
                            </motion.button>
                          )}
                          {u.role === "admin" || u.role === "donor" ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleVolunteer(u._id)}
                              className="btn btn-outline btn-warning btn-sm hover:bg-yellow-50 transition-all duration-200"
                            >
                              Make Volunteer
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAdmin(u._id)}
                              className="btn btn-outline btn-info btn-sm hover:bg-blue-50 transition-all duration-200"
                            >
                              Make Admin
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default AllUsers;
