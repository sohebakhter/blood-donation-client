import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["donation-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-red-500 text-center text-5xl px-5">
        Donation Request Details
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>requesterName</th>
              <th>recipientName</th>
              <th>donationTime</th>
              <th>recipientDistrict</th>
              <th>recipientUpazila</th>
              <th>bloodGroup</th>
              <th>fullAddress</th>
              <th>hospitalName</th>
              <th>requestMessage</th>
              <th>donationDate</th>
              <th>donationStatus</th>
            </tr>
          </thead>
          <tbody>
            {data && (
              <tr>
                <th>{data.requesterName}</th>
                <td>{data.recipientName}</td>
                <td>{data.donationTime}</td>
                <td>{data.recipientDistrict}</td>
                <td>{data.recipientUpazila}</td>
                <td>{data.bloodGroup}</td>
                <td>{data.fullAddress}</td>
                <td>{data.hospitalName}</td>
                <td>{data.requestMessage}</td>
                <td>{data.donationDate}</td>
                <td>{data.donationStatus}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
