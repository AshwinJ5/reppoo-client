"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchFaqs } from "../store/faqSlice";

const Faq = () => {
    const dispatch = useAppDispatch();
    const { list: faqs, loading } = useAppSelector((state) => state.faq);

    const [openFaq, setOpenFaq] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchFaqs());
    }, [dispatch]);

    const toggleFaq = (id: string) => {
        setOpenFaq((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <motion.section
                className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
                        Got answers to commonly asked questions about our AI health assistant app.
                    </p>
                </motion.div>

                {loading && <p className="text-center text-gray-500 py-10">Loading FAQs...</p>}

                <div className="space-y-3 md:space-y-4">
                    {!loading && faqs.length === 0 && <p className="text-center text-gray-500 py-10">No FAQs available.</p>}

                    {faqs.map((faq) => {
                        const isOpen = openFaq === faq._id;

                        return (
                            <motion.div
                                key={faq._id}
                                className="bg-[#FCFCFD] rounded-xl md:rounded-2xl shadow-sm overflow-hidden"
                                whileHover={{ y: -2 }}
                            >
                                <motion.button
                                    onClick={() => toggleFaq(faq._id)}
                                    className="w-full flex justify-between items-center p-4 md:p-6 text-left cursor-pointer hover:bg-gray-50/50 transition"
                                    aria-expanded={isOpen}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span
                                        className={`font-semibold text-sm md:text-base transition-colors duration-300 ${
                                            isOpen ? "text-[#3772FF]" : "text-gray-900"
                                        }`}
                                    >
                                        {faq.question}
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
                                    animate={{
                                        height: isOpen ? "auto" : 0,
                                        opacity: isOpen ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-4 md:px-6 pb-4 md:pb-6 text-gray-600 text-sm md:text-base">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>
        </>
    );
};

export default Faq;
