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
            [t.name ?? "", t.company ?? "", t.comment ?? "", t.designation ?? ""].some((field) =>
                field.toLowerCase().includes(q)
            )
        );
    }, [testimonials, searchQuery]);

    const handleDeleteTestimonial = async (id: string) => {
        const ok = confirm("Are you sure you want to delete this testimonial?");
        if (!ok) return;
        try {
            setDeleting(true);
            await dispatch(deleteTestimonial(id)).unwrap();
        } catch (err) {
            console.error("Delete testimonial failed", err);
            alert("Failed to delete testimonial.");
        } finally {
            setDeleting(false);
        }
    };

    const handleDeleteSelected = async () => {
        const selected = testimonials.filter((t) => t.selected);
        if (selected.length === 0) return;
        const ok = confirm(`Delete ${selected.length} selected testimonial(s)? This cannot be undone.`);
        if (!ok) return;

        try {
            setDeleting(true);
            for (const t of selected) {
                await dispatch(deleteTestimonial(t._id)).unwrap();
            }
        } catch (err) {
            console.error("Delete selected failed", err);
            alert("Failed to delete some testimonials. Check console.");
        } finally {
            setDeleting(false);
        }
    };

    const handleEditPrefetch = (id: string) => {
        dispatch(fetchSingleTestimonial(id));
    };

    const selectedCount = testimonials.filter((t) => t.selected).length;

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 font-sans">
            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 p-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-3xl font-bold tracking-tight text-slate-800">Testimonial Management</h1>
                                <p className="text-slate-600">Manage testimonials for the landing page.</p>
                            </div>

                            <Link
                                href="/admins/testimonial/add"
                                className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 h-10 px-4 text-white text-sm font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-200"
                            >
                                <Plus />
                                <span>Add New Testimonial</span>
                            </Link>
                        </div>

                        {/* Search & Actions */}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <div className="grow min-w-72">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Search />
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-800 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition-all duration-200"
                                        placeholder="Search by name, company, or comment..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="mt-6 flow-root">
                            <div className="overflow-x-auto">
                                <div className="inline-block min-w-full align-middle">
                                    <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg">
                                        <table className="min-w-full divide-y divide-slate-200">
                                            <thead className="bg-linear-to-r from-slate-50 to-slate-100">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-semibold text-slate-700"
                                                    >
                                                        Author
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-semibold text-slate-700"
                                                    >
                                                        Company
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-semibold text-slate-700"
                                                    >
                                                        Comment
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="relative py-3.5 pl-4 pr-6 text-right text-sm font-semibold text-slate-700"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-slate-200">
                                                {loading ? (
                                                    <tr>
                                                        <td colSpan={5} className="text-center py-8 text-slate-500">
                                                            Loading testimonials...
                                                        </td>
                                                    </tr>
                                                ) : filtered.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={5} className="text-center py-8 text-slate-500">
                                                            No testimonials found.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    filtered.map((testimonial) => (
                                                        <tr
                                                            key={testimonial._id}
                                                            className={`hover:bg-slate-50 transition-colors duration-150 ${
                                                                testimonial.selected ? "bg-blue-50" : ""
                                                            }`}
                                                        >
                                                            <td className="whitespace-nowrap px-4 py-4">
                                                                <div className="flex items-center">
                                                                    <div className="h-11 w-11 shrink-0">
                                                                        <div
                                                                            className="h-11 w-11 rounded-full bg-cover bg-center border-2 border-white shadow-sm"
                                                                            style={{
                                                                                backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/testimonials/${testimonial.file})`,
                                                                            }}
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4">
                                                                        <div className="font-medium text-slate-800">
                                                                            {testimonial.name}
                                                                        </div>
                                                                        <div className="text-slate-600 text-sm">
                                                                            {testimonial.designation}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                                                                {testimonial.company}
                                                            </td>

                                                            <td className="px-4 py-4 text-sm text-slate-600 max-w-xs">
                                                                <div className="truncate italic">
                                                                    &quot;{testimonial.comment}&quot;
                                                                </div>
                                                            </td>

                                                            <td className="relative whitespace-nowrap py-4 pl-4 pr-6 text-right">
                                                                <div className="flex items-center justify-end gap-3">
                                                                    <Link
                                                                        href={`/admins/testimonial/${testimonial._id}`}
                                                                        className="cursor-pointer text-slate-500 hover:text-blue-600 transition-colors duration-200 p-1.5 hover:bg-blue-50 rounded-lg"
                                                                        title="Edit"
                                                                    >
                                                                        <Pen
                                                                            onClick={() =>
                                                                                handleEditPrefetch(testimonial._id)
                                                                            }
                                                                        />
                                                                    </Link>

                                                                    <button
                                                                        onClick={() =>
                                                                            handleDeleteTestimonial(testimonial._id)
                                                                        }
                                                                        className="cursor-pointer text-slate-500 hover:text-red-600 transition-colors duration-200 p-1.5 hover:bg-red-50 rounded-lg"
                                                                        title="Delete"
                                                                        disabled={deleting}
                                                                    >
                                                                        <Trash />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedCount > 0 && (
                            <div className="mt-4 flex items-center justify-between rounded-xl bg-linear-to-r from-blue-50 to-blue-100 p-4 border-2 border-blue-200">
                                <div className="text-sm text-blue-700">{selectedCount} testimonial(s) selected</div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => alert("Publish selected - implement server API")}
                                        className="text-sm font-medium text-blue-700 hover:text-blue-800 px-3 py-1.5 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                                    >
                                        Publish Selected
                                    </button>
                                    <button
                                        onClick={handleDeleteSelected}
                                        className="text-sm font-medium text-red-700 hover:text-red-800 px-3 py-1.5 hover:bg-red-200 rounded-lg transition-colors duration-200"
                                    >
                                        Delete Selected
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TestimonialListPage;
