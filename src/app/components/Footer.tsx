import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <motion.footer
                className="border-t border-gray-200 mt-8 md:mt-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
                    <motion.div
                        className="flex flex-col lg:flex-row gap-8 md:gap-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                    >
                        <motion.div
                            className="lg:w-1/2"
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 },
                            }}
                        >
                            <div className="flex items-center gap-2 mb-3 md:mb-4">
                                <Image
                                    src="/logo.svg"
                                    width={30}
                                    height={30}
                                    alt="logo"
                                    className="w-6 h-6 md:w-7 md:h-7"
                                />
                                <span className="text-lg md:text-xl font-bold text-gray-900">Reppao</span>
                            </div>
                            <p className="text-sm text-[#1F221E] lg:w-2/3 leading-relaxed">
                                Empowering Healthier Lives with Start Your AI-driven Health Journey and Unlock Truly
                                Personalized Wellness in a Transformative Experience.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-around gap-6 md:gap-8 lg:gap-20"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <motion.div
                                className="min-w-[120px]"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Company</h3>
                                <ul className="space-y-2 text-sm text-[#1F221E]">
                                    <li className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                                        Home
                                    </li>
                                    <li className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                                        All Features
                                    </li>
                                    <li className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                                        API
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                className="min-w-[120px]"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">App</h3>
                                <ul className="space-y-2 text-sm text-[#1F221E]">
                                    <li className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                                        Dro Watches & iOS
                                    </li>
                                    <li className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                                        SmartWatch Android
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                className="min-w-[120px]"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">
                                    Legal Pages
                                </h3>
                                <ul className="space-y-2 text-sm text-[#1F221E]">
                                    <li className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                                        Privacy | T&Cs
                                    </li>
                                    <li className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                                        GDPR & CCPA Plan
                                    </li>
                                </ul>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 gap-4 md:gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-sm text-[#1F221E] order-2 md:order-1">© Copyright Reppao</p>

                        <div className="flex gap-3 md:gap-4 order-1 md:order-2">
                            {[
                                { icon: FaFacebook, label: "Facebook" },
                                { icon: FaTwitter, label: "Twitter" },
                                { icon: FaInstagram, label: "Instagram" },
                                { icon: FaLinkedin, label: "LinkedIn" },
                            ].map((social, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <Link
                                        href="#"
                                        className="text-[#23262F] hover:text-blue-600 hover:border-blue-300
                            w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 
                            rounded-full border border-gray-300 flex justify-center items-center
                            transition-all duration-300 hover:shadow-md bg-white"
                                        aria-label={social.label}
                                    >
                                        <social.icon size={20} className="md:w-5 md:h-5" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.footer>
            <motion.div
                className="fixed inset-0 -z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100/20 blur-3xl"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-100/10 blur-3xl"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
            </motion.div>
        </>
    );
};

export default Footer;
