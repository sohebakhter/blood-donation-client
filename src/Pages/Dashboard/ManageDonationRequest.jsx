import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
  const { register, handleSubmit } = useForm();

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
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Donation Request</h2>
      {/* --------------------------------------------- */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center"
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          {/* recipientName */}
          <label className="label">recipientName</label>
          <input
            type="text"
            defaultValue={recipientName}
            {...register("recipientName")}
            className="input"
            placeholder="recipientName"
          />
          {/* recipientDistrict */}
          <label className="label">recipientDistrict</label>
          <input
            type="text"
            defaultValue={recipientDistrict}
            {...register("recipientDistrict")}
            className="input"
            placeholder="recipientDistrict"
          />
          {/* recipientUpazila */}
          <label className="label">recipientUpazila</label>
          <input
            type="text"
            defaultValue={recipientUpazila}
            {...register("recipientUpazila")}
            className="input"
            placeholder="recipientUpazila"
          />

          {/* hospitalName */}
          <label className="label">hospitalName</label>
          <input
            type="text"
            defaultValue={hospitalName}
            {...register("hospitalName")}
            className="input"
            placeholder="hospitalName"
          />
          {/* fullAddress */}
          <label className="label">fullAddress</label>
          <input
            type="text"
            defaultValue={fullAddress}
            {...register("fullAddress")}
            className="input"
            placeholder="fullAddress"
          />

          <button className="btn btn-neutral mt-4">Submit</button>
        </fieldset>
      </form>
    </div>
  );
};

export default ManageDonationRequest;
