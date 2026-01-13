import React from "react";
import { motion } from "framer-motion";
import { FaUserFriends, FaHeartbeat, FaTint, FaMapMarkedAlt } from "react-icons/fa";

const stats = [
    {
        id: 1,
        label: "Donors Registered",
        value: "2,500+",
        icon: FaUserFriends,
        color: "text-blue-500",
        bg: "bg-blue-100",
    },
    {
        id: 2,
        label: "Lives Saved",
        value: "15,000+",
        icon: FaHeartbeat,
        color: "text-red-500",
        bg: "bg-red-100",
    },
    {
        id: 3,
        label: "Blood Units Collected",
        value: "5,400+",
        icon: FaTint,
        color: "text-red-600",
        bg: "bg-red-50",
    },
    {
        id: 4,
        label: "Districts Covered",
        value: "64",
        icon: FaMapMarkedAlt,
        color: "text-green-500",
        bg: "bg-green-100",
    },
];

const ImpactStats = () => {
    return (
        <div className="py-16 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-6xl font-bold mt-5 mb-4 bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                        Our Impact
                    </h2>
                    <p className="text-lg text-base-content/70">
                        Together we are making a difference, one drop at a time.
                    </p>
                    <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-base-100 rounded-2xl shadow-xl p-14 border border-base-300 text-center relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <stat.icon className={`text-6xl ${stat.color}`} />
                            </div>

                            <div
                                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}
                            >
                                <stat.icon className="text-3xl" />
                            </div>

                            <h3 className={`text-3xl font-bold mb-2 ${stat.color}`}>
                                {stat.value}
                            </h3>
                            <p className="text-base-content/70 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImpactStats;
