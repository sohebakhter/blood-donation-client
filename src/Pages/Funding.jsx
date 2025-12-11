import React, { useRef } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Funding = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const handlePayment = (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    console.log(amount);
    const paymentInfo = {
      senderName: user?.displayName,
      senderEmail: user?.email,
      cost: amount,
      parcelName: "Funding Amount",
    };
    axiosSecure.post("/create-checkout-session", paymentInfo).then((res) => {
      console.log(res.data);
      window.location.assign(res.data.url);
    });
  };

  const handleModal = () => {
    modalRef.current.showModal();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl text-center text-cyan-600 py-5">
        Funding {payments.length}
      </h1>
      <div className="flex justify-end items-center">
        <button onClick={handleModal} className="btn bg-cyan-600 text-white ">
          Give Fund
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Funding Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{p.senderName}</td>
                <td>{p.amount}</td>
                <td>{p.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <form onSubmit={handlePayment} className="flex gap-2">
            <input
              type="number"
              placeholder="Funding Amount"
              className="input"
              name="amount"
              required
            />
            <button type="sumbit" className="btn btn-neutral">
              Confirm
            </button>
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

export default Funding;
