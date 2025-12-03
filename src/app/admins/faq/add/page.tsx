"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, X } from "lucide-react";
import AdminSidebar from "@/app/components/AdminSidebar";
import { useAppDispatch } from "@/app/store/hooks";
import { createFaq } from "@/app/store/faqSlice";

const FAQAddPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        question: "",
        answer: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await dispatch(createFaq(formData)).unwrap();
            router.push("/admins/faq");
        } catch (error) {
            console.error("Create failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => router.push("/admins/faq");

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 font-sans">
            <div className="lg:flex">
                <AdminSidebar />

                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-4xl mx-auto">

                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <Link
                                href="/admins/faq"
                                className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>

                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
                                    Add FAQ
                                </h1>
                                <p className="text-slate-600 text-sm md:text-base">
                                    Add a new question & answer for your FAQ section.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-4 sm:p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Question <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="question"
                                        value={formData.question}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 text-slate-800 transition"
                                        placeholder="Enter your question..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Answer <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="answer"
                                        value={formData.answer}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 text-slate-800 transition"
                                        placeholder="Enter the answer..."
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-200">

                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={isSubmitting}
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition"
                                    >
                                        <X className="w-5 h-5" />
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                Save FAQ
                                            </>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default FAQAddPage;
