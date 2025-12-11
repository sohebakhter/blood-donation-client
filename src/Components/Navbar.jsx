import React from "react";
import { Link } from "react-router";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/donation-requests">DonationRequests</Link>
      </li>
      {user ? (
        <li>
          <Link to="/funding">Funding</Link>
        </li>
      ) : (
        <li>
          <Link to="/about">About</Link>
        </li>
      )}
    </>
  );

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <div className="shadow-sm">
      <div className="max-w-7xl mx-auto navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            BloodDonation
          </Link>
        </div>
        <div className="flex gap-2">
          <ul className="flex items-center gap-2 font-semibold">{links}</ul>
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <ul>
              <li>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
