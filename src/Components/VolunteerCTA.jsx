import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaBullhorn, FaUsers, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";

const VolunteerCTA = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <FaHandHoldingHeart />,
            title: "Organize Camps",
            desc: "Help set up and manage blood donation camps in your locality.",
        },
        {
            icon: <FaBullhorn />,
            title: "Spread Awareness",
            desc: "Educate people about the importance of blood donation.",
        },
        {
            icon: <FaUsers />,
            title: "Build Community",
            desc: "Connect donors with those in need and build a support network.",
        },
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-red-950 to-black -z-10"></div>
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Become a <span className="text-red-500">Volunteer</span>
                    </h2>
                    <p className="text-xl text-gray-300">
                        You don't just have to donate blood to save lives. Join our team of
                        dedicated volunteers and help us make a bigger impact.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white/5 backdrop-blur-xs p-8 rounded-2xl border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="text-5xl text-red-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <button
                        onClick={() => navigate("/register")}
                        className="btn bg-red-600 hover:bg-red-700 text-white border-none px-10 py-4 h-auto text-xl rounded-full shadow-lg shadow-red-600/30 group">
                        Join the Movement
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default VolunteerCTA;
