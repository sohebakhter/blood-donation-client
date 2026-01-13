import React from "react";
import logo from "../assets/logo.jpg";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const socialHover = {
    scale: 1.1,
    rotate: 5,
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <footer className="relative bg-gradient-to-br from-red-950 via-red-900 to-red-800 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-red-600 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-orange-600 blur-3xl"></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10 container px-6 pt-20 pb-10 text-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div className="lg:col-span-4 space-y-6" variants={itemVariants}>
            <Link to="/" className="flex items-center space-x-3 group w-fit">
              <motion.div
                className="overflow-hidden rounded-2xl border-2 border-white/20 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <img src={logo} alt="Red Love Logo" className="w-16 h-16 object-cover" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-red-100 tracking-tight">
                  Red Love
                </span>
                <span className="text-xs text-red-200 tracking-widest uppercase">Donate Blood, Save Life</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-red-100/80 pr-4 max-w-sm">
              Streamlining blood donation with easy registration,
              login, and advanced search. Connect quickly, donate easily, save
              lives. Join our community today.
            </p>
          </motion.div>

          {/* Pages */}
          <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-bold text-white relative inline-block pb-2">
              Pages
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-red-400 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm text-red-100/70">
              {["Gallery", "Volunteers", "Campaign", "Contact Us", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="hover:text-white flex items-center gap-2 group w-fit"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-0 group-hover:w-1.5 h-1.5 bg-red-400 rounded-full transition-all duration-300"></span>
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Important */}
          <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-bold text-white relative inline-block pb-2">
              Important
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-red-400 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm text-red-100/70">
              <li>
                <motion.div whileHover={{ x: 5 }} className="w-fit">
                  <Link
                    to="/about"
                    className="hover:text-white flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-1.5 h-1.5 bg-red-400 rounded-full transition-all duration-300"></span>
                    About Us
                  </Link>
                </motion.div>
              </li>
              {["Blog", "Gallery", "Volunteers", "Campaign", "Contact Us"].map((item, idx) => (
                <li key={idx}> {/* Using index for duplicates in original code */}
                  <motion.a
                    href="#"
                    className="hover:text-white flex items-center gap-2 group w-fit"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-0 group-hover:w-1.5 h-1.5 bg-red-400 rounded-full transition-all duration-300"></span>
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Us */}
          <motion.div className="lg:col-span-4 space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-bold text-white relative inline-block pb-2">
              Newsletter
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-red-400 rounded-full"></span>
            </h3>
            <p className="text-sm text-red-100/80 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <form className="relative group max-w-sm">
              <input
                className="w-full bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent placeholder-red-200/50 transition-all"
                placeholder="Enter your email"
                type="email"
              />
              <motion.button
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-md px-4 flex items-center justify-center shadow-lg hover:shadow-red-500/30"
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="material-icons text-sm font-semibold">Send</span>
              </motion.button>
            </form>

            <div className="pt-2">
              <h4 className="text-sm font-semibold text-red-100 mb-3">Follow Us</h4>
              <div className="flex items-center space-x-4">
                <motion.a
                  href="https://www.facebook.com/realsohebakhter"
                  target="_blank"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-red-600 text-white rounded-lg flex items-center justify-center shadow-lg border border-white/10"
                  whileHover={socialHover}
                >
                  <FaFacebook className="text-xl" />
                </motion.a>
                <motion.a
                  href="https://github.com/sohebakhter"
                  target="_blank"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-gray-800 text-white rounded-lg flex items-center justify-center shadow-lg border border-white/10"
                  whileHover={socialHover}
                >
                  <FaGithub className="text-xl" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/soheb-akhter"
                  target="_blank"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg border border-white/10"
                  whileHover={socialHover}
                >
                  <FaLinkedin className="text-xl" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-red-200/60"
          variants={itemVariants}
        >
          <p>
            Copyright © {new Date().getFullYear()}
            <span className="font-medium text-white px-1">Soheb Akhter</span>
            All Rights Reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
