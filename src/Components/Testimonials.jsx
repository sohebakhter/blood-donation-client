import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Regular Donor",
        image: "https://i.pravatar.cc/150?img=1",
        text: "Being able to find donation centers easily and track my donation history has been amazing. This app makes it so simple to give back.",
        rating: 5,
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Recipient",
        image: "https://i.pravatar.cc/150?img=11",
        text: "When my father needed urgent surgery, we found a donor within hours through this platform. I cannot express my gratitude enough.",
        rating: 5,
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "Volunteer",
        image: "https://i.pravatar.cc/150?img=5",
        text: "Managing donation camps and coordinating with donors is a breeze now. The features are exactly what we needed to be more efficient.",
        rating: 5,
    },
];

const Testimonials = () => {
    return (
        <div className="py-20 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-6xl font-bold mb-4 bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                        Voices of Hope
                    </h2>
                    <p className="text-lg text-base-content/70">
                        Real stories from our community of heroes and survivors.
                    </p>
                    <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="bg-base-100 p-8 rounded-2xl shadow-xl border border-base-300 relative flex flex-col"
                        >
                            <FaQuoteLeft className="text-4xl text-red-100 absolute top-6 right-6" />

                            <div className="flex items-center space-x-1 mb-6 text-yellow-400">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>

                            <p className="text-base-content/80 text-lg mb-6 flex-1 italic">
                                "{testimonial.text}"
                            </p>

                            <div className="flex items-center space-x-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-14 h-14 rounded-full border-2 border-red-500 object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-base-content">{testimonial.name}</h4>
                                    <p className="text-sm text-red-500 font-medium">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
