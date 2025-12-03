"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchFeature } from "../store/featureSlice";

const Feature = () => {
    const dispatch = useAppDispatch();
    const { data: feature, loading } = useAppSelector((state) => state.feature);

    useEffect(() => {
        dispatch(fetchFeature());
    }, [dispatch]);

    if (loading) {
        return <div className="py-20 text-center text-gray-500">Loading feature…</div>;
    }

    if (!feature) {
        return <div className="py-20 text-center text-gray-500">No Feature data available.</div>;
    }

    return (
        <motion.section
            className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 },
                },
            }}
        >
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                <motion.div
                    className="flex flex-col justify-between gap-6 md:gap-8"
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: {
                            opacity: 1,
                            x: 0,
                            transition: { type: "spring", stiffness: 100 },
                        },
                    }}
                >
                    <div className="space-y-4 md:space-y-6">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{feature.title}</h2>

                        <div className="space-y-2">
                            <p className="text-[#23262F] font-medium text-lg">{feature.subtitle}</p>

                            <p className="text-[#777E90] text-base leading-relaxed">{feature.description}</p>
                        </div>
                    </div>

                    <motion.button
                        className="text-black font-semibold cursor-pointer rounded-full hover:underline self-start"
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Read More
                    </motion.button>
                </motion.div>

                <motion.div
                    className="bg-[#F4F5F6] rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8"
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            transition: { type: "spring", stiffness: 100, delay: 0.2 },
                        },
                    }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="relative aspect-video md:aspect-auto md:h-80">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/features/${feature.image}`}
                            fill
                            alt={feature.title}
                            className="object-contain rounded-xl"
                        />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Feature;
