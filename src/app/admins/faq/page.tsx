"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import AdminSidebar from "@/app/components/AdminSidebar";
import { Pen, Plus, Search, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchFaqs, deleteFaq } from "@/app/store/faqSlice";

const FAQListPage = () => {
    const dispatch = useAppDispatch();
    const { list: faqs, loading } = useAppSelector((state) => state.faq);

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchFaqs());
    }, [dispatch]);

    const filteredFaqs = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return faqs.filter((faq) =>
            faq.question.toLowerCase().includes(q) ||
            faq.answer.toLowerCase().includes(q)
        );
    }, [faqs, searchQuery]);

    const handleDeleteFaq = async (id: string) => {
        if (!confirm("Delete FAQ? This action cannot be undone.")) return;
        try {
            await dispatch(deleteFaq(id)).unwrap();
        } catch {
            alert("Failed to delete FAQ.");
        }
    };

    const renderTableSkeleton = () => (
        <>
            {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                        <div className="h-3 w-56 rounded skeleton mb-2"></div>
                        <div className="h-3 w-40 rounded skeleton"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-3 w-64 rounded skeleton mb-2"></div>
                        <div className="h-3 w-48 rounded skeleton"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex gap-3 justify-start">
                            <div className="h-8 w-8 rounded-md skeleton"></div>
                            <div className="h-8 w-8 rounded-md skeleton"></div>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );

    const renderMobileSkeleton = () => (
        <>
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow flex flex-col gap-3 animate-pulse"
                >
                    <div className="h-4 w-48 skeleton rounded"></div>
                    <div className="h-3 w-full skeleton rounded"></div>
                    <div className="h-3 w-2/3 skeleton rounded"></div>

                    <div className="pt-2 flex justify-end gap-3">
                        <div className="w-10 h-10 rounded-full skeleton"></div>
                        <div className="w-10 h-10 rounded-full skeleton"></div>
                    </div>
                </div>
            ))}
        </>
    );

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 font-sans">
            <div className="lg:flex">
                <AdminSidebar />

                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                                    FAQ Management
                                </h1>
                                <p className="text-slate-600 text-sm md:text-base">
                                    Manage the frequently asked questions for the landing page.
                                </p>
                            </div>

                            <Link
                                href="/admins/faq/add"
                                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 h-10 px-5 text-white text-sm font-semibold shadow-md hover:bg-blue-700 transition"
                            >
                                <Plus size={18} />
                                Add New FAQ
                            </Link>
                        </div>

                        <div className="mb-6">
                            <div className="relative max-w-md">
                                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-300"
                                    placeholder="Search by question or answer..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="hidden md:block rounded-2xl border border-slate-200 bg-white shadow overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Question</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Answer</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200">
                                    {loading && renderTableSkeleton()}

                                    {!loading && filteredFaqs.length > 0 &&
                                        filteredFaqs.map((faq) => (
                                            <tr key={faq._id} className="hover:bg-slate-50 transition">
                                                <td className="px-6 py-4 align-top font-medium text-slate-800">
                                                    {faq.question}
                                                </td>

                                                <td className="px-6 py-4 align-top text-slate-600 text-sm">
                                                    <span className="line-clamp-2">{faq.answer}</span>
                                                </td>

                                                <td className="px-6 py-4 align-top">
                                                    <div className="flex items-center gap-3">
                                                        <Link
                                                            href={`/admins/faq/${faq._id}`}
                                                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                        >
                                                            <Pen size={16} />
                                                        </Link>

                                                        <button
                                                            onClick={() => handleDeleteFaq(faq._id)}
                                                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                        >
                                                            <Trash size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    {!loading && filteredFaqs.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="text-center py-10 text-slate-500">
                                                No FAQs found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="md:hidden flex flex-col gap-4 mt-6">
                            {loading ? (
                                renderMobileSkeleton()
                            ) : filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq) => (
                                    <div
                                        key={faq._id}
                                        className="bg-white rounded-2xl border border-slate-200 shadow p-4 flex flex-col gap-3"
                                    >
                                        <p className="font-semibold text-slate-800">{faq.question}</p>
                                        <p className="text-slate-600 text-sm">{faq.answer}</p>

                                        <div className="flex justify-end gap-4 pt-2">
                                            <Link
                                                href={`/admins/faq/${faq._id}`}
                                                className="p-2 rounded-full bg-blue-50 text-blue-600"
                                            >
                                                <Pen size={18} />
                                            </Link>

                                            <button
                                                onClick={() => handleDeleteFaq(faq._id)}
                                                className="p-2 rounded-full bg-red-50 text-red-600"
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-slate-500">No FAQs found.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FAQListPage;
