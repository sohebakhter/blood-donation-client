import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CreateDonationRequest = () => {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const { user } = useAuth();
  // console.log("user--------", user);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const realData = useLoaderData();

  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log("upazila data", data);
        setUpazilas(data); //upazilas একটি array
      })
      .catch((err) => console.log(err));
  }, []);

  const selectedDistrict = useWatch({ control, name: "recipientDistrict" });

  const upazilaByDistrictId = (districtId) => {
    const districtUpazilas = upazilas.filter(
      (u) => u.district_id === districtId
    );
    const upazilasName = districtUpazilas.map((u) => u.name);
    return upazilasName;
  };

  const onSubmit = (data) => {
    // get district name from id (important)
    const districtName = realData.find((d) => d.id === data.recipientDistrict);

    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.recipientName,
      recipientDistrict: districtName?.name,
      recipientUpazila: data.recipientUpazila,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      donationStatus: "pending",
    };

    axiosSecure
      .post("/donation-requests?status=active", requestData)
      .then((res) => {
        try {
          if (res.data.insertedId) {
            toast.success("ডোনেশন রিকোয়েস্ট সফলভাবে তৈরি হয়েছে!");
          }
        } catch (error) {
          const message = error.response?.data?.message; //alert কাজ করতেছে না
          toast.error(message);
        }
      });
  };

  // if (isBlocked) {
  //   return (
  //     <div className="p-6 text-center bg-red-100 text-red-800 rounded-md">
  //       আপনি বর্তমানে ডোনেশন রিকোয়েস্ট তৈরি করতে পারছেন না।
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">
        নতুন ডোনেশন রিকোয়েস্ট তৈরি করুন
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Requester Name */}
        <div>
          <label className="block font-medium">রিকোয়েস্টার নাম</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full border p-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Requester Email */}
        <div>
          <label className="block font-medium">রিকোয়েস্টার ইমেইল</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full border p-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="block font-medium">প্রাপকের নাম</label>
          <input
            type="text"
            {...register("recipientName", { required: true })}
            className="w-full border p-2 rounded-md"
          />
          {errors.recipientName && (
            <p className="text-red-500">প্রাপকের নাম প্রয়োজন।</p>
          )}
        </div>

        {/* Recipient District */}
        <div>
          <label className="block font-medium">প্রাপকের জেলা</label>
          <select
            {...register("recipientDistrict", { required: true })}
            className="w-full border p-2 rounded-md"
            defaultValue="pick a District"
          >
            <option disabled={true} value="pick a District">
              জেলা নির্বাচন করুন
            </option>
            {realData.map((d, i) => (
              <option key={i} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.recipientDistrict && (
            <p className="text-red-500">জেলা নির্বাচন করুন।</p>
          )}
        </div>

        {/* Recipient Upazila */}
        <div>
          <label className="block font-medium">প্রাপকের উপজেলা</label>
          <select
            {...register("recipientUpazila", { required: true })}
            className="w-full border p-2 rounded-md"
            defaultValue="Pick a Upazila"
          >
            <option value="pick a Upazila">উপজেলা নির্বাচন করুন</option>
            {upazilaByDistrictId(selectedDistrict).map((u, i) => (
              <option key={i} value={u}>
                {u}
              </option>
            ))}
          </select>
          {errors.recipientUpazila && (
            <p className="text-red-500">উপজেলা নির্বাচন করুন।</p>
          )}
        </div>

        {/* Hospital Name */}
        <div>
          <label className="block font-medium">হাসপাতালের নাম</label>
          <input
            type="text"
            {...register("hospitalName", { required: true })}
            className="w-full border p-2 rounded-md"
          />
          {errors.hospitalName && (
            <p className="text-red-500">হাসপাতালের নাম প্রয়োজন।</p>
          )}
        </div>

        {/* Full Address */}
        <div>
          <label className="block font-medium">পূর্ণ ঠিকানা</label>
          <input
            type="text"
            {...register("fullAddress", { required: true })}
            className="w-full border p-2 rounded-md"
          />
          {errors.fullAddress && (
            <p className="text-red-500">পূর্ণ ঠিকানা প্রয়োজন।</p>
          )}
        </div>

        {/* Blood Group */}
        <div>
          <label className="block font-medium">রক্তের গ্রুপ</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="w-full border p-2 rounded-md"
          >
            <option value="">রক্তের গ্রুপ নির্বাচন করুন</option>
            {bloodGroups.map((bg, i) => (
              <option key={i} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          {errors.bloodGroup && (
            <p className="text-red-500">রক্তের গ্রুপ প্রয়োজন।</p>
          )}
        </div>

        {/* Donation Date */}
        <div>
          <label className="block font-medium">ডোনেশন তারিখ</label>
          <input
            type="date"
            {...register("donationDate", { required: true })}
            className="w-full border p-2 rounded-md"
          />
          {errors.donationDate && (
            <p className="text-red-500">তারিখ প্রয়োজন।</p>
          )}
        </div>

        {/* Donation Time */}
        <div>
          <label className="block font-medium">ডোনেশন সময়</label>
          <input
            type="time"
            {...register("donationTime", { required: true })}
            className="w-full border p-2 rounded-md"
          />
          {errors.donationTime && <p className="text-red-500">সময় প্রয়োজন।</p>}
        </div>

        {/* Request Message */}
        <div>
          <label className="block font-medium">রিকোয়েস্ট মেসেজ</label>
          <textarea
            {...register("requestMessage", { required: true })}
            rows="4"
            className="w-full border p-2 rounded-md"
            placeholder="কেন রক্তের প্রয়োজন তা বিস্তারিত লিখুন"
          ></textarea>
          {errors.requestMessage && (
            <p className="text-red-500">রিকোয়েস্ট মেসেজ প্রয়োজন।</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Make A Donation Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
