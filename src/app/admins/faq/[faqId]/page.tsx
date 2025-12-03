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
        dispatch(fetchSingleFaq(faqId as string));
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
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await dispatch(
                updateFaq({
                    id: faqId as string,
                    data: {
                        question: formData.question,
                        answer: formData.answer,
                    },
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
                <div className="flex">
                    <AdminSidebar />
                    <main className="flex-1 p-8">
                        <div className="text-center max-w-md mx-auto mt-20 bg-red-50 border border-red-200 p-6 rounded-xl">
                            <h2 className="text-red-800 font-semibold mb-2">Error Loading FAQ</h2>
                            <p className="text-red-600 mb-4">{error}</p>
                            <Link href="/admins/faq" className="text-blue-600 flex items-center gap-2">
                                <ArrowLeft size={16} /> Back to FAQs
                            </Link>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 p-8">
                    <div className=" mx-auto">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-8">
                            <Link
                                href="/admins/faq"
                                className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition"
                            >
                                <ArrowLeft className="text-slate-600" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-slate-800">Edit FAQ</h1>
                                <p className="text-slate-600">Update the question and answer.</p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white border-2 border-slate-200 p-6 md:p-8 rounded-2xl shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-2">
                                        Question <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="question"
                                        value={formData.question}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 text-slate-800"
                                        placeholder="Enter question"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold text-slate-700 mb-2">
                                        Answer <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="answer"
                                        value={formData.answer}
                                        onChange={handleChange}
                                        rows={6}
                                        required
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 text-slate-800"
                                        placeholder="Enter answer"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-3 border-t pt-6">
                                    <button
                                        type="button"
                                        onClick={() => router.push("/admins/faq")}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-300 hover:bg-slate-50"
                                        disabled={isSubmitting}
                                    >
                                        <X /> Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div>
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
