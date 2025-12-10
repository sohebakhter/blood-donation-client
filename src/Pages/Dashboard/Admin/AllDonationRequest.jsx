import React, { useState } from "react";
// import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  // const { user } = useAuth();
  const [status, setStatus] = useState("all");
  // const [page, setPage] = useState(1);
  // const limit = 10;`

  const { data: requests = [], refetch } = useQuery({
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
  return (
    <div>
      <div className=" w-full px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4">
            All Donation Request {filteredRequests.length}
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
            <thead>
              <tr>
                <th>#</th>
                <th>Requester Name</th>
                <th>Requester Email</th>
                <th>RecipientName</th>
                <th>RecipientDistrict</th>
                <th>Needed Group</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((r, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{r.requesterName}</td>
                  <td>{r.requesterEmail}</td>
                  <td>{r.recipientName}</td>
                  <td>{r.recipientDistrict}</td>
                  <td>{r.bloodGroup}</td>
                  <td>{r.donationStatus}</td>
                  {r.donationStatus === "inprogress" && (
                    <>
                      <td
                        onClick={() => handleDone(r._id)}
                        className="btn btn-primary"
                      >
                        Done
                      </td>
                      <td
                        onClick={() => handleCancel(r._id)}
                        className="btn btn-warning ml-2"
                      >
                        Cancel
                      </td>
                    </>
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
