import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: pendingData = [] } = useQuery({
    queryKey: ["donationRequests", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests?status=pending");
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl text-center">
        Donation Requests {pendingData.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>fullAddress</th>
              <th>bloodGroup</th>
              <th>donationDate</th>
              <th>donationTime</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingData.map((pending, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{pending.recipientName}</td>
                <td>{pending.fullAddress}</td>
                <td>{pending.bloodGroup}</td>
                <td>{pending.donationDate}</td>
                <td>{pending.donationTime}</td>
                <td>{pending.donationStatus}</td>
                <td className="btn btn-neutral btn-xs">
                  <Link
                    to={`/dashboard/donation-request-details/${pending._id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationRequests;
