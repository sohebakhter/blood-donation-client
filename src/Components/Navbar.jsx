import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import logo from "../assets/logo.jpg";
import { CgProfile } from "react-icons/cg";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/donation-requests">DonationRequests</NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
          <li>
            <NavLink to="/funding">Funding</NavLink>
          </li>
        </>
      ) : (
        <li>
          <NavLink to="/about">About</NavLink>
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
    <div className="shadow-sm sticky top-0 z-50 bg-base-100/30 backdrop-blur-md">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow z-10"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-16 rounded-full" />
            <Link to="/" className="font-semibold text-red-600 text-2xl md:text-5xl ml-2">
              Red Love
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-xl gap-2">
            {links}
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow z-10"
              >
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <button onClick={handleSignOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn bg-red-600 text-white font-semibold text-lg md:text-xl"
            >
              <CgProfile className="text-xl" />
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
