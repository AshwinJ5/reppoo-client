"use client";
import { useEffect, useState, useCallback } from "react";
import { Plus, Minus, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const Landing = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(2);
    const [isPaused, setIsPaused] = useState(false);
    const [current, setCurrent] = useState(0);

    // Framer Motion controls
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 100]);

    const faqs = [
        {
            q: "What features does the AI Health Assistant offer?",
            a: "Our AI Health Assistant provides personalized health tracking, workout plans, nutrition guidance, and real-time health coaching.",
        },
        {
            q: "Is the app customizable to my needs?",
            a: "Yes, the app adapts to your personal health goals, preferences, and fitness level.",
        },
        {
            q: "How accurate is the AI health tracking?",
            a: "Experience the future of personalized health and wellness before everyone else. Join our exclusive early access program and help shape the future of AI-powered health coaching.",
        },
        {
            q: "Do I need any special equipment?",
            a: "No special equipment is required. You can start with bodyweight exercises and add equipment as you progress.",
        },
        {
            q: "How does the free trial work?",
            a: "Get full access to all features for 7 days. Cancel anytime before the trial ends with no charges.",
        },
    ];

    const testimonials = [
        {
            text: `"The level of personalization is unmatched. The app identifies exactly what I need to improve my health and gives spot-on recommendations."`,
            name: "Ava L.",
            role: "Marketing Executive",
            subtitle: "Empowered by AI Wellness Journeys",
            avatarColor: "#D3A489",
        },
        {
            text: `"The level of personalization is unmatched. The app identifies exactly what I need to improve my health and gives spot-on recommendations."`,
            name: "Namo Serlina",
            role: "CEO Delego",
            subtitle: "Transformed Through AI Wellness",
            avatarColor: "#D3A489",
        },
        {
            text: `"This app helped me rebuild my daily habits. I sleep better, feel calmer, and finally have a system that adapts to me."`,
            name: "Ava L.",
            role: "5 Star Rated",
            subtitle: "Empowered by Reppoo",
            avatarColor: "#D3A489",
        },
    ];

    const t = testimonials[current];

    const goNext = useCallback(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const goPrev = useCallback(() => {
        setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }, [testimonials.length]);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            goNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, goNext]);

    // Stagger animations for logo grid
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

    const testimonialVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <motion.div
            className="min-h-screen bg-[#FCFCFD] overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.header
                className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 md:py-6 sticky top-0 z-50 bg-[#FCFCFD]/95 backdrop-blur-sm"
                style={{ y }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Image src={"/logo.svg"} width={30} height={30} alt="logo" className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="text-lg md:text-xl font-bold text-gray-900">Reppoo</span>
                </motion.div>
                <motion.button
                    className="text-sm md:text-base text-gray-700 hover:text-gray-900 font-semibold cursor-pointer transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Admin login
                </motion.button>
            </motion.header>

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

            <motion.section
                className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }}
            >
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                    <motion.div
                        className="flex flex-col justify-between gap-6 md:gap-8"
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
                        }}
                    >
                        <div className="space-y-4 md:space-y-6">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                                Maximizing Your Health Potential Together
                            </h2>
                            <div className="space-y-2">
                                <p className="text-[#23262F] font-medium text-lg">Smart Nutrition Planning</p>
                                <p className="text-[#777E90] text-base leading-relaxed">
                                    Smart AI-driven Program can be improved health in a program health frameworks benefits
                                    like that way AI-driven health framework making healthy living simple and sustainable.
                                </p>
                            </div>
                        </div>
                        <motion.button
                            className="text-black font-semibold cursor-pointer rounded-full hover:underline self-start"
                            whileHover={{ x: 10 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Read More →
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="bg-[#F4F5F6] rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8"
                        variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, delay: 0.2 } },
                        }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="relative aspect-video md:aspect-auto md:h-80">
                            <Image
                                src={"/feature.png"}
                                fill
                                alt="Smart Nutrition Planning feature"
                                className="object-contain rounded-xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                className="w-full py-12 md:py-20 flex flex-col items-center px-4 sm:px-6"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F1F1F] text-center"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    viewport={{ once: true }}
                >
                    Our Users Feel the Transformation
                </motion.h2>
                <motion.p
                    className="text-center text-gray-500 mt-2 text-sm md:text-base"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    Real Stories from People Empowered by Personalized Wellness
                </motion.p>

                <div className="relative w-full max-w-4xl mt-8 md:mt-12">
                    <motion.button
                        onClick={goPrev}
                        className="absolute left-0 md:-left-12 lg:-left-20 top-1/2 -translate-y-1/2
                        w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 flex items-center justify-center
                        bg-white hover:bg-gray-100 transition z-10"
                        aria-label="Previous testimonial"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    </motion.button>

                    <div className="relative h-[300px] md:h-[350px] flex items-center">
                        <AnimatePresence mode="wait" custom={1}>
                            <motion.div
                                key={current}
                                className="bg-white rounded-2xl md:rounded-3xl shadow-sm px-6 py-8 md:px-10 md:py-12 text-center mx-2 md:mx-0 w-full"
                                variants={testimonialVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={1}
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                }}
                            >
                                <p className="text-[#1F221E] leading-relaxed text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
                                    {t.text}
                                </p>

                                <div className="mt-8 md:mt-10 flex flex-col items-center">
                                    <motion.div
                                        className="w-12 h-12 md:w-14 md:h-14 rounded-full"
                                        style={{ backgroundColor: t.avatarColor }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3, type: "spring" }}
                                    />
                                    <p className="mt-4 font-semibold text-[#1F1F1F] text-base md:text-lg">
                                        {t.name}, {t.role}
                                    </p>
                                    <p className="text-gray-500 text-sm md:text-base mt-1">{t.subtitle}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <motion.button
                        onClick={goNext}
                        className="absolute right-0 md:-right-12 lg:-right-20 top-1/2 -translate-y-1/2
                        w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#3772FF] flex items-center justify-center
                        hover:bg-blue-600 transition shadow-md z-10"
                        aria-label="Next testimonial"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </motion.button>
                </div>

                <motion.div
                    className="hidden sm:flex gap-4 md:gap-6 mt-8 md:mt-10 w-full max-w-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {testimonials.map((item, i) => (
                        <motion.button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl md:rounded-2xl shadow-sm
                transition-all duration-300 cursor-pointer flex-1 min-w-0
                ${current === i ? "shadow-md bg-white" : "opacity-50 hover:opacity-50 bg-gray-50"}
                hover:scale-[1.02] active:scale-[0.98]
            `}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            animate={current === i ? { scale: 1.02 } : { scale: 1 }}
                        >
                            <motion.div
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full shrink-0 border-2 border-white"
                                style={{ backgroundColor: item.avatarColor }}
                                animate={current === i ? { scale: 1.1 } : { scale: 1 }}
                            />
                            <div className="text-left flex-1 min-w-0">
                                <p className={`font-medium text-sm md:text-base truncate`}>{item.name}</p>
                                <p className="text-xs md:text-sm text-gray-500 truncate">{item.role}</p>
                            </div>
                        </motion.button>
                    ))}
                </motion.div>
            </motion.section>

            <motion.section
                className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.2,
                        },
                    },
                }}
            >
                <motion.div
                    className="max-w-md mx-auto text-center mb-8 md:mb-12"
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
                    }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base">
                        Got answers to commonly asked about our AI health assistant App.
                    </p>
                </motion.div>

                <div className="space-y-3 md:space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openFaq === idx;

                        return (
                            <motion.div
                                key={idx}
                                className="bg-[#FCFCFD] rounded-xl md:rounded-2xl shadow-sm overflow-hidden"
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
                                }}
                                whileHover={{ y: -2 }}
                            >
                                <motion.button
                                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                                    className="w-full flex justify-between items-center p-4 md:p-6 text-left cursor-pointer hover:bg-gray-50/50 transition"
                                    aria-expanded={isOpen}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span
                                        className={`font-semibold text-sm md:text-base transition-colors duration-300 ${
                                            isOpen ? "text-[#3772FF]" : "text-gray-900"
                                        }`}
                                    >
                                        {faq.q}
                                    </span>
                                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                        {isOpen ? (
                                            <Minus className="w-4 h-4 md:w-5 md:h-5 text-gray-500 shrink-0" />
                                        ) : (
                                            <Plus className="w-4 h-4 md:w-5 md:h-5 text-gray-500 shrink-0" />
                                        )}
                                    </motion.div>
                                </motion.button>

                                <motion.div
                                    initial={false}
                                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-4 md:px-6 pb-4 md:pb-6 text-gray-600 text-sm md:text-base">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

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
        </motion.div>
    );
};

export default Landing;
