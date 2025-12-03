"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Faq from "./FAQ";
import Testimonial from "./Testimonial";
import Feature from "./Feature";
import useWakeServer from "@/app/store/useWakeServer";
import ServerWakeLoader from "@/app/components/ServerWakeLoader";

const Landing = () => {
    const waking = useWakeServer();
    const logoContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 0.4,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    if (waking) {
    return <ServerWakeLoader />;
}

    return (
        <motion.div
            className="min-h-screen bg-[#FCFCFD] overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Navbar />

            <section className="max-w-6xl mx-auto px-8 py-16 text-center">
                <div className="relative mb-12">
                    <div className="flex justify-center items-center gap-8 mb-8">
                        <div className="hidden md:block bg-[#FCFCFD] rounded-3xl shadow-xl w-48 lg:w-64 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                            <Image
                                src={"/left.png"}
                                width={256}
                                height={320}
                                alt="AI Health Assistant feature"
                                className="rounded-3xl object-cover w-full h-auto"
                                priority
                            />
                        </div>

                        <motion.div
                            className="relative w-64 md:w-72"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative aspect-9/16 ">
                                <Image
                                    src={"/hero.png"}
                                    fill
                                    alt="AI Health Coach App Interface"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>

                        <div className="hidden md:block bg-[#FCFCFD] rounded-3xl shadow-xl w-48 lg:w-64 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                            <Image
                                src={"/right.png"}
                                width={256}
                                height={320}
                                alt="Health tracking feature"
                                className="rounded-3xl object-cover w-full h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>

                <motion.div
                    className="flex items-center justify-center gap-2 mb-6 md:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="flex -space-x-2">
                        {["/client02.jpg", "/client01.jpg", "/client03.jpg"].map((src, index) => (
                            <motion.div
                                key={index}
                                className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-[#FCFCFD]"
                                initial={{ scale: 0, rotate: 180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", delay: 0.7 + index * 0.1 }}
                                whileHover={{ scale: 1.1, zIndex: 10 }}
                            >
                                <Image src={src} fill alt={`Happy user ${index + 1}`} className="object-cover" />
                            </motion.div>
                        ))}
                    </div>
                    <motion.span
                        className="text-sm md:text-base text-[#23262F]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <span className="font-bold text-xl md:text-2xl">53,852 </span> Happy Users
                    </motion.span>
                </motion.div>

                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                >
                    Your AI Health Coach
                </motion.h1>
                <motion.p
                    className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    Transform your well-being journey with seamless data AI-powered guidance that adapts to you, right from
                    start.
                </motion.p>

                <motion.div
                    className="flex flex-row gap-3 md:gap-4 justify-center px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <motion.button
                        className="px-6 py-3 text-black rounded-full font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Image src={"/ios.svg"} width={24} height={24} alt="iOS App Store" className="w-6 h-6" />
                        <span>Download</span>
                    </motion.button>
                    <motion.button
                        className="px-6 py-3 text-gray-900 rounded-full font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Image src={"/android.svg"} width={24} height={24} alt="Google Play Store" className="w-6 h-6" />
                        <span>Download</span>
                    </motion.button>
                </motion.div>
            </section>

            <motion.div
                className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12"
                variants={logoContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 justify-items-center items-center">
                    {["/logo01.png", "/logo02.png", "/logo03.png", "/logo04.png", "/logo05.png"].map((src, index) => (
                        <motion.div
                            key={index}
                            className="relative w-32 h-8 md:w-40 md:h-10"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
                            }}
                            whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 400 } }}
                        >
                            <Image src={src} fill alt={`Partner logo ${index + 1}`} className="object-contain" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <Feature />

            <Testimonial />

            <Faq />

            <motion.section
                className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <motion.div
                    className="text-xs md:text-sm text-gray-500 mb-2 tracking-wider"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    SPECIAL LAUNCH OFFER
                </motion.div>
                <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 md:mb-6"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Your journey to better health starts now
                </motion.h2>
                <motion.p
                    className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    Get 50% off our first 3 months when you start (new AI tribe today!)
                </motion.p>

                <motion.div
                    className="flex flex-row gap-3 md:gap-4 justify-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <motion.button
                        className="px-6 py-3 text-black rounded-full font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Image src={"/ios.svg"} width={24} height={24} alt="iOS App Store" className="w-6 h-6" />
                        <span>Download</span>
                    </motion.button>
                    <motion.button
                        className="px-6 py-3 text-gray-900 rounded-full font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Image src={"/android.svg"} width={24} height={24} alt="Google Play Store" className="w-6 h-6" />
                        <span>Download</span>
                    </motion.button>
                </motion.div>
            </motion.section>

            <Footer />
        </motion.div>
    );
};

export default Landing;
