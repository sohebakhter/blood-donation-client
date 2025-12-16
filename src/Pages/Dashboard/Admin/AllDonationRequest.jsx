import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useRole from "../../../Hooks/useRole";

const AllDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  const [status, setStatus] = useState("all");

  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["total-donation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-donation");
      return res.data;
    },
  });

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
  const isAvailable = filteredRequests.some(
    (s) => s.donationStatus === "inprogress"
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className=" w-full px-4">
        <div className="flex justify-between items-center flex-col md:flex-row mb-3 md:mb-0">
          <h2 className="text-4xl text-red-400 font-semibold mb-4">
            All Donation Request
          </h2>
          {/* filter by status */}
          <select
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending Data</option>
            <option value="inprogress">Inprogress Data</option>
            <option value="done">Done</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-red-300">
              <tr>
                <th>#</th>
                <th>Requester Name</th>
                <th>Requester Email</th>
                <th>RecipientName</th>
                <th>RecipientDistrict</th>
                <th>Needed Group</th>
                <th>Donation Status</th>
                {isAvailable && <th>Actions</th>}
              </tr>
            </thead>
            <tbody className="bg-red-200">
              {filteredRequests.map((r, i) => (
                <tr key={i}>
                  <th className="text-lg font-medium text-gray-600">{i + 1}</th>
                  <td className="text-lg font-medium text-gray-600">
                    {r.requesterName}
                  </td>
                  <td className="text-lg font-medium text-gray-600">
                    {r.requesterEmail}
                  </td>
                  <td className="text-lg font-medium text-gray-600">
                    {r.recipientName}
                  </td>
                  <td className="text-lg font-medium text-gray-600">
                    {r.recipientDistrict}
                  </td>
                  <td className="text-lg font-medium text-gray-600">
                    {r.bloodGroup}
                  </td>
                  <td
                    className={`text-lg font-semibold text-gray-600 ${
                      r.donationStatus === "inprogress" ||
                      r.donationStatus === "done"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {r.donationStatus}
                  </td>
                  {r.donationStatus === "inprogress" && (
                    <td className="flex">
                      {role === "admin" && (
                        <>
                          <button className="btn btn-neutral">
                            <Link
                              to={`/dashboard/manage-donation-request/${r._id}`}
                            >
                              Edit
                            </Link>
                          </button>
                          <button
                            onClick={() => handleDelete(r._id)}
                            className="btn btn-error"
                          >
                            Delete
                          </button>
                          <button className="btn btn-neutral">
                            <Link
                              to={`/dashboard/donation-request-details/${r._id}`}
                            >
                              View
                            </Link>
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDone(r._id)}
                        className="btn btn-primary"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleCancel(r._id)}
                        className="btn btn-warning"
                      >
                        Cancel
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllDonationRequest;
