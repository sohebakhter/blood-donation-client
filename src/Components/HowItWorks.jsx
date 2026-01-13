import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaSearchLocation, FaHandHoldingHeart } from "react-icons/fa";

const steps = [
    {
        id: 1,
        title: "Register",
        description: "Create an account in less than 2 minutes. It's fast, free, and secure.",
        icon: FaUserPlus,
        color: "text-blue-500",
        bg: "bg-blue-100",
    },
    {
        id: 2,
        title: "Find or Request",
        description: "Search for blood donors near you or post a request if you need blood urgently.",
        icon: FaSearchLocation,
        color: "text-purple-500",
        bg: "bg-purple-100",
    },
    {
        id: 3,
        title: "Save a Life",
        description: "Connect continuously with donors and recipients to make a life-saving impact.",
        icon: FaHandHoldingHeart,
        color: "text-red-500",
        bg: "bg-red-100",
    },
];

const HowItWorks = () => {
    return (
        <div className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-6xl font-bold mb-4 bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                        How It Works
                    </h2>
                    <p className="text-lg text-base-content/70">
                        Simple steps to join our mission and start saving lives.
                    </p>
                    <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-base-300 -z-0 transform -translate-y-1/2"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="relative z-10 flex flex-col items-center text-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl mb-6 border-4 border-white dark:border-base-100 ${step.bg}`}
                            >
                                <step.icon className={`text-4xl ${step.color}`} />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-3 text-base-content">{step.title}</h3>
                            <p className="text-base-content/70 max-w-xs">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
