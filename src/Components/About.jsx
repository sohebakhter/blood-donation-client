import React from "react";
import donateImg from "../assets/blood-donation-3.png";
import { FaShieldAlt, FaUserShield } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";

const About = () => {
  return (
    <section className="text-gray-800">
      {/* Intro */}
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 mt-10">
          About <span className="text-red-600">Red Love</span>
        </h1>

        <p className="text-base sm:text-lg leading-7 sm:leading-8 mb-10 text-center max-w-4xl mx-auto">
          RedLove is a community-driven platform dedicated to connecting blood
          donors with people in urgent need. We also provide a trusted way for
          users to contribute small funds to support medical emergencies,
          transportation, and social wellness projects.
        </p>
      </div>

      {/* Main Section */}
      <div className="bg-gradient-to-b from-red-200 to-white">
        <div
          className="
            max-w-7xl mx-auto
            px-4
            py-16
            flex flex-col
            lg:flex-row
            items-center
            gap-10
          "
        >
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={donateImg}
              alt="Blood Donation"
              className="max-w-sm sm:max-w-md lg:max-w-lg w-full"
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                About RedLove
              </h1>
              <p className="text-sm sm:text-base leading-7">
                Red Love is a community-driven blood donation platform dedicated
                to saving lives by connecting blood donors with patients in
                need. It enables users to create and manage blood donation
                requests, view real-time details, and respond quickly during
                emergencies. With a simple and user-friendly design, Red Love
                aims to make blood donation faster, easier, and more accessible
                for everyone.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <FaShieldAlt className="text-red-500 text-4xl sm:text-5xl shrink-0" />
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold">
                    All Data is Secured
                  </h1>
                  <p className="text-sm sm:text-base">
                    Your personal and donation-related information is safely
                    stored and protected. Red Love ensures data privacy and
                    security so users can focus on what truly matters—saving
                    lives.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaUserShield className="text-red-500 text-4xl sm:text-5xl shrink-0" />
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold">
                    Always Free for All
                  </h1>
                  <p className="text-sm sm:text-base">
                    Red Love is completely free to use for everyone. There are
                    no hidden charges or fees—our mission is to make blood
                    donation accessible, open, and available to all who want to
                    help save lives.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <IoMdLogIn className="text-red-500 text-4xl sm:text-5xl shrink-0" />
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold">
                    Advance Search Feature
                  </h1>
                  <p className="text-sm sm:text-base">
                    Easily find blood donors by selecting blood group, district,
                    and upazila. This advanced search helps you quickly connect
                    with the right donors during emergencies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
