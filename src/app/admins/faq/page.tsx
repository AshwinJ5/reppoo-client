"use client";

import React, { useEffect, useState } from "react";
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

    const filteredFaqs = faqs.filter((faq) => {
        const q = searchQuery.toLowerCase();
        return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    });

    const handleDeleteFaq = async (id: string) => {
        const ok = confirm(`Delete  FAQ? This cannot be undone.`);
        if (!ok) return;

        try {
            await dispatch(deleteFaq(id)).unwrap();
        } catch (err) {
            console.error("Delete selected failed", err);
            alert("Failed to delete some faqs. Check console.");
        } finally {
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 font-sans">
            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl font-bold tracking-tight text-slate-800">FAQ Management</h1>
                                <p className="text-slate-600">
                                    Manage the frequently asked questions for the landing page.
                                </p>
                            </div>

                            <Link
                                href="/admins/faq/add"
                                className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 h-10 px-5 text-white text-sm font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-200"
                            >
                                <Plus />
                                <span>Add New FAQ</span>
                            </Link>
                        </div>

                        <div className="mb-8">
                            <div className="relative max-w-md">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search />
                                </div>

                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 text-slate-800 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition-all duration-200"
                                    placeholder="Search by question or answer..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-linear-to-r from-slate-50 to-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 text-slate-700 text-sm font-semibold">Question</th>
                                            <th className="px-6 py-4 text-slate-700 text-sm font-semibold">Answer</th>
                                            <th className="px-6 py-4 text-slate-700 text-sm font-semibold">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-200">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={3} className="text-center py-8 text-slate-500">
                                                    Loading FAQs...
                                                </td>
                                            </tr>
                                        ) : filteredFaqs.length > 0 ? (
                                            filteredFaqs.map((faq) => (
                                                <tr
                                                    key={faq._id}
                                                    className="hover:bg-slate-50 transition-colors duration-150"
                                                >
                                                    <td className="px-6 py-4 align-top">
                                                        <div className="text-slate-800 font-medium">{faq.question}</div>
                                                    </td>

                                                    <td className="px-6 py-4 align-top">
                                                        <div className="text-slate-600 text-sm line-clamp-2">
                                                            {faq.answer}
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 align-top">
                                                        <div className="flex items-center gap-3">
                                                            <Link
                                                                href={`/admins/faq/${faq._id}`}
                                                                className="cursor-pointer text-slate-500 hover:text-blue-600 transition-colors duration-200 p-1.5 hover:bg-blue-50 rounded-lg"
                                                                title="Edit"
                                                            >
                                                                <Pen />
                                                            </Link>

                                                            <button
                                                                onClick={() => handleDeleteFaq(faq._id)}
                                                                className="cursor-pointer text-slate-500 hover:text-red-600 transition-colors duration-200 p-1.5 hover:bg-red-50 rounded-lg"
                                                                title="Delete"
                                                            >
                                                                <Trash />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="text-center py-8 text-slate-500">
                                                    No FAQs found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {!loading && filteredFaqs.length === 0 && (
                            <div className="text-center py-12">
                                <div className="mx-auto max-w-md">
                                    <h3 className="text-lg font-medium text-slate-700 mb-2">No FAQs Found</h3>
                                    <p className="text-slate-500 mb-6">
                                        {searchQuery
                                            ? `No FAQs match your search for "${searchQuery}".`
                                            : "No FAQs available. Add your first FAQ to get started."}
                                    </p>

                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Clear search
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FAQListPage;
