import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const Faq = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(2);
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
        </>
    );
};

export default Faq;
