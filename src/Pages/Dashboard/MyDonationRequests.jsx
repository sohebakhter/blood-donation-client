import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const MyDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [status, setStatus] = useState("all");
  // const [page, setPage] = useState(1);
  // const limit = 10;`

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["myDonationRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-donation-requests?email=${user?.email}`
      );
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

  // const { requests = [], totalPages = 1 } = data;

  // if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className=" w-full px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4">My Donation Requests</h2>
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
                <th>Requester(Me)</th>
                <th>Requester(Me)</th>
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

        {/* Pagination */}
        {/* <div className="flex justify-center mt-4 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="btn"
          >
            Previous
          </button>

          <span className="py-2 px-4">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="btn"
          >
            Next
          </button>
        </div> */}

        {/* --------------------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default MyDonationRequests;
