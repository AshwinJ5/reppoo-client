"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/app/components/AdminSidebar";
import { Pen, Plus, Search, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchTestimonials, deleteTestimonial, fetchSingleTestimonial } from "@/app/store/testimonialSlice";

type TestimonialItem = {
    _id: string;
    name: string;
    designation: string;
    company: string;
    comment: string;
    file: string;
    createdAt?: string;
    selected?: boolean;
};

const TestimonialListPage = () => {
    const dispatch = useAppDispatch();
    const { list: apiTestimonials, loading } = useAppSelector((s) => s.testimonial);

    const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [dispatch]);

    useEffect(() => {
        const mapped = (apiTestimonials || []).map((t: TestimonialItem) => ({
            ...t,
            selected: false,
        }));
        setTestimonials(mapped);
    }, [apiTestimonials]);

    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return testimonials;
        return testimonials.filter((t) =>
            [t.name, t.company, t.comment, t.designation].some((field) => (field ?? "").toLowerCase().includes(q))
        );
    }, [testimonials, searchQuery]);

    const handleDeleteTestimonial = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            setDeleting(true);
            await dispatch(deleteTestimonial(id)).unwrap();
        } finally {
            setDeleting(false);
        }
    };

    const handleEditPrefetch = (id: string) => {
        dispatch(fetchSingleTestimonial(id));
    };

    const renderTableSkeleton = () => (
        <>
            {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                    <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full skeleton"></div>
                            <div>
                                <div className="h-3 w-24 rounded skeleton mb-2"></div>
                                <div className="h-3 w-16 rounded skeleton"></div>
                            </div>
                        </div>
                    </td>

                    <td className="px-4 py-4">
                        <div className="h-3 w-28 rounded skeleton"></div>
                    </td>

                    <td className="px-4 py-4">
                        <div className="h-3 w-40 rounded skeleton"></div>
                    </td>

                    <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-3">
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
                <div key={i} className="bg-white border rounded-2xl p-4 shadow flex flex-col gap-3 animate-pulse">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full skeleton"></div>
                        <div>
                            <div className="h-3 w-24 skeleton mb-2"></div>
                            <div className="h-3 w-20 skeleton"></div>
                        </div>
                    </div>

                    <div className="h-3 w-32 skeleton"></div>
                    <div className="h-3 w-full skeleton"></div>

                    <div className="flex justify-end gap-3 pt-2">
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
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Testimonial Management</h1>
                                <p className="text-slate-600 text-sm md:text-base">
                                    Manage testimonials for the landing page.
                                </p>
                            </div>

                            <Link
                                href="/admins/testimonial/add"
                                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 h-10 px-5 text-white text-sm font-semibold shadow-md hover:bg-blue-700 transition"
                            >
                                <Plus size={18} />
                                Add Testimonial
                            </Link>
                        </div>

                        <div className="mt-6">
                            <div className="relative max-w-md">
                                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-300"
                                    placeholder="Search testimonials..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="hidden md:block mt-6 overflow-x-auto">
                            <div className="rounded-2xl border border-slate-200 shadow bg-white">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                                                Author
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                                                Company
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                                                Comment
                                            </th>
                                            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-200">
                                        {loading ? renderTableSkeleton() : null}

                                        {!loading && filtered.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="py-6 text-center text-slate-500">
                                                    No testimonials found.
                                                </td>
                                            </tr>
                                        )}

                                        {!loading &&
                                            filtered.map((t) => (
                                                <tr key={t._id} className="hover:bg-slate-50">
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="w-12 h-12 rounded-full bg-cover bg-center border border-slate-200 shadow"
                                                                style={{
                                                                    backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/testimonials/${t.file})`,
                                                                }}
                                                            />
                                                            <div>
                                                                <p className="font-medium text-slate-800">{t.name}</p>
                                                                <p className="text-sm text-slate-600">{t.designation}</p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-slate-600">{t.company}</td>

                                                    <td className="px-4 py-4 text-sm text-slate-600 max-w-xs truncate italic">
                                                        &quot;{t.comment}&quot;
                                                    </td>

                                                    <td className="px-4 py-4 text-right">
                                                        <div className="flex justify-end gap-3">
                                                            <Link
                                                                href={`/admins/testimonial/${t._id}`}
                                                                onClick={() => handleEditPrefetch(t._id)}
                                                                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                            >
                                                                <Pen size={16} />
                                                            </Link>

                                                            <button
                                                                onClick={() => handleDeleteTestimonial(t._id)}
                                                                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                            >
                                                                <Trash size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="md:hidden mt-6 flex flex-col gap-4">
                            {loading ? (
                                renderMobileSkeleton()
                            ) : filtered.length === 0 ? (
                                <></>
                            ) : (
                                filtered.map((t) => (
                                    <div
                                        key={t._id}
                                        className="bg-white rounded-2xl shadow border border-slate-200 p-4 flex flex-col gap-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-14 h-14 rounded-full bg-cover bg-center shadow border border-slate-200"
                                                style={{
                                                    backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/testimonials/${t.file})`,
                                                }}
                                            />
                                            <div>
                                                <p className="font-semibold text-slate-800 text-lg">{t.name}</p>
                                                <p className="text-slate-600 text-sm">{t.designation}</p>
                                            </div>
                                        </div>

                                        <p className="text-blue-700 text-sm font-medium">{t.company}</p>

                                        <p className="text-slate-700 text-sm italic">&quot;{t.comment}&quot;</p>

                                        <div className="flex justify-end gap-4 pt-2">
                                            <Link
                                                href={`/admins/testimonial/${t._id}`}
                                                onClick={() => handleEditPrefetch(t._id)}
                                                className="p-2 rounded-full bg-blue-50 text-blue-600"
                                            >
                                                <Pen size={18} />
                                            </Link>

                                            <button
                                                onClick={() => handleDeleteTestimonial(t._id)}
                                                className="p-2 rounded-full bg-red-50 text-red-600"
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TestimonialListPage;
