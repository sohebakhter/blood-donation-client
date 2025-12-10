import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const openModal = useRef();

  const { data, refetch } = useQuery({
    queryKey: ["donation-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });

  const handleModal = () => {
    openModal.current.showModal();
  };

  const handleConfirmDonate = () => {
    const updatedInfo = { donationStatus: "inprogress" };
    axiosSecure.patch(`/donation-requests/${id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("Donation In Progress");
        refetch();
      }
    });
  };

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
                <td
                  className={`${
                    data.donationStatus === "pending"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {data.donationStatus}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-5">
        <button onClick={handleModal} className="btn btn-primary">
          Donate
        </button>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={openModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Donate!</h3>
          <form>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
              <label className="label">Name</label>
              <input
                type="text"
                className="input w-full "
                placeholder="Name"
                defaultValue={user?.displayName}
                readOnly
              />

              <label className="label">Email</label>
              <input
                type="email"
                className="input w-full "
                placeholder="Email"
                defaultValue={user?.email}
                readOnly
              />

              <button
                onClick={handleConfirmDonate}
                className="btn btn-success mt-4"
              >
                Confirm
              </button>
            </fieldset>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DonationRequestDetails;
