"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTestimonials } from "../store/testimonialSlice";
import Image from "next/image";

const Testimonial = () => {
    const dispatch = useAppDispatch();
    const { list: testimonials, loading } = useAppSelector((state) => state.testimonial);

    const [isPaused, setIsPaused] = useState(false);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [dispatch]);

    const goNext = useCallback(() => {
        if (testimonials.length > 0) {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }
    }, [testimonials]);

    const goPrev = useCallback(() => {
        if (testimonials.length > 0) {
            setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        }
    }, [testimonials]);

    useEffect(() => {
        if (isPaused || testimonials.length === 0) return;
        const interval = setInterval(() => goNext(), 5000);
        return () => clearInterval(interval);
    }, [isPaused, goNext, testimonials.length]);

    const testimonialVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    if (loading || testimonials.length === 0) {
        return (
            <div className="py-20 text-center text-gray-500">
                Loading testimonials…
            </div>
        );
    }

    const t = testimonials[current];

    return (
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

            {/* Slider */}
            <div className="relative w-full max-w-4xl mt-8 md:mt-12">
                {/* Prev Button */}
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
                                &quot;{t.comment}&quot;
                            </p>

                            <div className="mt-8 md:mt-10 flex flex-col items-center">
                                {/* Avatar Image */}
                                <motion.div
                                    className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border shadow-sm"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                >
                                    <Image width={40} height={40}
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/testimonials/${t.file}`}
                                        alt={t.name}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>

                                <p className="mt-4 font-semibold text-[#1F1F1F] text-base md:text-lg">
                                    {t.name}, {t.designation}
                                </p>
                                <p className="text-gray-500 text-sm md:text-base mt-1">{t.company}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Next Button */}
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

            {/* Thumbnail Buttons */}
            <motion.div
                className="hidden sm:flex gap-4 md:gap-6 mt-8 md:mt-10 w-full max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {testimonials.map((item, i) => (
                    <motion.button
                        key={item._id}
                        onClick={() => setCurrent(i)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl md:rounded-2xl shadow-sm
                            transition-all duration-300 cursor-pointer flex-1 min-w-0
                            ${current === i ? "shadow-md bg-white" : "opacity-50 hover:opacity-50 bg-gray-50"}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border"
                            animate={current === i ? { scale: 1.1 } : { scale: 1 }}
                        >
                            <Image width={40} height={40}
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/testimonials/${item.file}`}
                                        alt={t.name}
                                        className="w-full h-full object-cover"
                                    />
                        </motion.div>

                        <div className="text-left flex-1 min-w-0">
                            <p className="font-medium text-sm md:text-base truncate">{item.name}</p>
                            <p className="text-xs md:text-sm text-gray-500 truncate">{item.designation}</p>
                        </div>
                    </motion.button>
                ))}
            </motion.div>
        </motion.section>
    );
};

export default Testimonial;
