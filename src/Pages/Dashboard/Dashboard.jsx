import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useRole from "../../Hooks/useRole";

const Dashboard = () => {
  const { role } = useRole();
  console.log("this is the role", role);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //user indevitual data for WELCOMING
  const { data: userData = {} } = useQuery({
    queryKey: ["users-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-profile?email=${user?.email}`);
      return res.data;
    },
  });

  // const [page, setPage] = useState(1);
  // const limit = 10;

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard?email=${user?.email}`);
      return res.data;
    },
  });
  console.log("donation requests data test", requests);

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

  //Dashboard এ admin এর অংশ এখানে
  const { data: donors = [] } = useQuery({
    queryKey: ["donor"], //backend theke je data antesi.. sei data Key hisebe bosbe
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?role=donor`);
      return res.data;
    },
  });

  const { data: totalReq = [] } = useQuery({
    queryKey: ["total-donation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-donation");
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-4xl font-normal text-center py-5">
        Hello Welcome
        <span className="text-red-500 font-bold"> {userData?.displayName}</span>
      </h1>
      {/* Dashboard এ donor এর অংশ এখানে  */}
      {role === "donor" && (
        <>
          {requests.length < 0 ? (
            <h1 className="text-5xl text-gray-400 text-center mt-24">
              Nothing Found
            </h1>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>RequesterName</th>

                      <th>RecipientName</th>
                      <th>RecipientDistrict</th>
                      <th>RecipientUpazila</th>
                      <th>Donation Date</th>
                      <th>Donation Time</th>
                      <th>Needed Group</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((r, i) => (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{r.requesterName}</td>

                        <td>{r.recipientName}</td>
                        <td>{r.recipientDistrict}</td>
                        <td>{r.recipientUpazila}</td>
                        <td>{r.donationDate}</td>
                        <td>{r.donationTime}</td>
                        <td>{r.bloodGroup}</td>
                        <td>{r.donationStatus}</td>
                        {r.donationStatus === "inprogress" && (
                          <>
                            <td className="btn btn-neutral">
                              <Link
                                to={`/dashboard/manage-donation-request/${r._id}`}
                              >
                                Edit
                              </Link>
                            </td>
                            <td
                              onClick={() => handleDelete(r._id)}
                              className="btn btn-error"
                            >
                              Delete
                            </td>
                            <td className="btn btn-neutral">
                              <Link
                                to={`/dashboard/donation-request-details/${r._id}`}
                              >
                                View
                              </Link>
                            </td>
                            <td
                              onClick={() => handleDone(r._id)}
                              className="btn btn-primary"
                            >
                              Done
                            </td>
                            <td
                              onClick={() => handleCancel(r._id)}
                              className="btn btn-warning"
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
              <div className="flex justify-center mt-5">
                <Link
                  to="/dashboard/my-donation-requests"
                  className="btn btn-primary "
                >
                  View My All Request
                </Link>
              </div>
            </>
          )}
        </>
      )}

      {/* Dashboard এ admin এর অংশ এখানে  */}
      {role === "admin" ||
        (role === "volunteer" && (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Total User(Donors)</th>
                  <th>Total Funding</th>
                  <th>Total Blood Donation Request</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td className="font-bold text-2xl text-blue-600">
                    {donors.length}
                  </td>
                  <td className="font-bold text-2xl text-blue-600">
                    $500 (demo)
                  </td>
                  <td className="font-bold text-2xl text-blue-600">
                    {totalReq.length}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
