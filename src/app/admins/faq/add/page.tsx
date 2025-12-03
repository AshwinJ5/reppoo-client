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

    // Handle input change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle Create FAQ
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await dispatch(
                createFaq({
                    question: formData.question,
                    answer: formData.answer,
                })
            ).unwrap();

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
            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-8">
                            <Link
                                href="/admins/faq"
                                className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>

                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                                    Add FAQ
                                </h1>
                                <p className="text-slate-600">Add new question & answer.</p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Question */}
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
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 text-slate-800"
                                        placeholder="Enter your question..."
                                    />
                                </div>

                                {/* Answer */}
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
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 text-slate-800"
                                        placeholder="Enter the answer..."
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={isSubmitting}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-300 hover:bg-slate-50"
                                    >
                                        <X className="w-5 h-5" />
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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
