"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";

import AdminSidebar from "@/app/components/AdminSidebar";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchSingleFaq, updateFaq } from "@/app/store/faqSlice";

export default function FAQEditPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { faqId } = useParams();

    const { selectedFaq, loading, error } = useAppSelector((state) => state.faq);

    const [formData, setFormData] = useState({
        question: "",
        answer: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (faqId) dispatch(fetchSingleFaq(faqId as string));
    }, [dispatch, faqId]);

    useEffect(() => {
        if (selectedFaq) {
            setFormData({
                question: selectedFaq.question || "",
                answer: selectedFaq.answer || "",
            });
        }
    }, [selectedFaq]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await dispatch(
                updateFaq({
                    id: faqId as string,
                    data: formData,
                })
            ).unwrap();

            router.push("/admins/faq");
        } catch (err) {
            console.error("FAQ update failed", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading && !selectedFaq) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin h-12 w-12 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
                <div className="lg:flex">
                    <AdminSidebar />
                    <main className="flex-1 p-4 md:p-8">
                        <div className="text-center max-w-md mx-auto mt-20 bg-red-50 border border-red-300 p-6 rounded-xl shadow">
                            <h2 className="text-red-800 font-semibold mb-2">Failed to Load FAQ</h2>
                            <p className="text-red-600 mb-4">{error}</p>
                            <Link href="/admins/faq" className="text-blue-600 flex justify-center gap-2">
                                <ArrowLeft size={16} /> Back to FAQ List
                            </Link>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
            <div className="lg:flex">
                <AdminSidebar />

                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <Link
                                href="/admins/faq"
                                className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition text-slate-600"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Edit FAQ</h1>
                                <p className="text-slate-600 text-sm md:text-base">Update the question and answer.</p>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
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
                                        placeholder="Enter question..."
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition"
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
                                        rows={6}
                                        required
                                        placeholder="Enter answer..."
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-3 border-t pt-6">
                                    <button
                                        type="button"
                                        onClick={() => router.push("/admins/faq")}
                                        disabled={isSubmitting}
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-300 hover:bg-slate-50 transition"
                                    >
                                        <X /> Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save /> Save Changes
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
}
