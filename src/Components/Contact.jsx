import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  return (
    <div className="min-h-(calc(100vh-560px)) bg-base-100 px-4 py-10 md:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-red-600">Contact Us</h1>
          <p className="mt-3 text-gray-500">
            Have questions, need blood urgently, or want to collaborate? Feel
            free to reach out.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-red-600 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-gray-500">+880 1XXXXXXXXX</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-red-600 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-500">support@blooddonation.org</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-red-600 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Address</h3>
                <p className="text-gray-500">Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-xl">
              <p className="text-sm text-red-600">
                ⚠️ For emergency blood requests, please call directly instead of
                using the form.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4, duration: 0.6 }}
            className="card bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-center text-red-600">
                Send a Message
              </h2>

              <form className="space-y-4 mt-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                  required
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full"
                  required
                />

                <textarea
                  placeholder="Your Message"
                  className="textarea textarea-bordered w-full h-32"
                  required
                ></textarea>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn bg-red-600 text-white w-full hover:bg-red-700"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
