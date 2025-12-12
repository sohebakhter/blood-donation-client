import React from "react";
import donateImg from "../assets/blood-donation-3.png";
import { FaShieldAlt, FaUserShield } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";

const About = () => {
  return (
    <section className=" text-gray-800 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 mt-5">
          About <span className="text-red-600">Red Life</span>
        </h1>

        <p className="text-lg leading-8 mb-6 text-center">
          RedLife is a community-driven platform dedicated to connecting blood
          donors with people in urgent need. We also provide a trusted way for
          users to contribute small funds to support medical emergencies,
          transportation, and social wellness projects.
        </p>
      </div>

      <div className="bg-gradient-to-b from-red-200 to-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-5 py-20">
          <div>
            <img src={donateImg} alt="" />
          </div>
          <div>
            <div className="space-y-10">
              <div className="space-y-5">
                <h1 className="text-4xl font-semibold">About RedLife</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam nesciunt voluptatibus perferendis mollitia quaerat!
                  Fugit a placeat odit quibusdam, enim nisi dolores autem, quod
                  reprehenderit nam adipisci dolorem distinctio ipsum.
                </p>
              </div>
              <div>
                <div className="flex gap-2">
                  <FaShieldAlt className="text-red-500 text-5xl " />
                  <div>
                    <h1 className="text-2xl font-semibold">
                      All Data is Secured
                    </h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veniam Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Veniam
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <FaUserShield className="text-red-500 text-5xl " />
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Always Free for All
                    </h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veniam Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Veniam
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <IoMdLogIn className="text-red-500 text-5xl " />
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Advance Search Feature
                    </h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veniam Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Veniam
                    </p>
                  </div>
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
