import { motion } from "framer-motion";
import { FaHeart, FaQuoteLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

import storyImg from "../assets/blood-donation-3.png";

const SuccessStory = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-base-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                            <img
                                src={storyImg}
                                alt="Success Story"
                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -left-6 w-full h-full bg-red-100 dark:bg-red-900/30 rounded-2xl -z-0"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-100 dark:bg-yellow-900/30 rounded-full blur-2xl -z-0"></div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-1/2 space-y-6"
                    >
                        <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-4 py-2 rounded-full font-semibold text-sm">
                            <FaHeart className="animate-pulse" />
                            <span>Inspiring Story</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Saved by a <span className="text-red-600">Stranger</span>
                        </h2>

                        <div className="relative pl-6 border-l-4 border-red-500">
                            <FaQuoteLeft className="absolute -top-2 -left-2 text-4xl text-red-200 dark:text-red-900/50 -z-10" />
                            <p className="text-lg text-base-content/80 italic">
                                "I never thought I'd need blood myself until my accident. Thanks to a generous donor I had never met, I was given a second chance at life. Now, I donate regularly to pass on the gift."
                            </p>
                            <p className="mt-4 font-bold text-lg">— Sarah J., Teacher & Mother</p>
                        </div>

                        <p className="text-base-content/70">
                            Every drop counts. Sarah is just one of the thousands of lives saved every day through voluntary blood donation. Be the hero in someone's story.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/donation-requests")}
                            className="btn bg-red-600 hover:bg-red-700 text-white border-none px-8 text-lg rounded-full shadow-lg shadow-red-500/30"
                        >
                            Read More Stories
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SuccessStory;
