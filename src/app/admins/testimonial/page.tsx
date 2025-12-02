"use client";
import { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/app/components/AdminSidebar";

interface TestimonialItem {
    id: number;
    name: string;
    designation: string;
    company: string;
    comment: string;
    imageUrl: string;
    selected: boolean;
}

const TestimonialListPage = () => {
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>([
        {
            id: 1,
            name: "Jane Doe",
            designation: "CEO",
            company: "Innovate Inc.",
            comment: "This service transformed our business. The results were beyond our expectations...",
            imageUrl:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCCYLZnolYNm7rVIo1yfVN8BbayjplbLkaCT2ca4HYRKqnKnNR7cTEakamTBRQQuUeZvK_HkRGuO8dsaQLe3mfP6Zea8GmCHg7B5ysKYa_DBIuk0bxF3DEism3gAbAGZVFFpCfQ2yK23EV0P3pJrZetfxRYsuSrKp62N21NVsPeDiQog97-S-6uHbjDKSxLSdCCdK3j9H50Zay9zvgEmLnvN-k-tAIXmy0VK8wMUAZX0IRl8wWkVl-I-MHmH5lJOe4L1Gk_zukQi5ws",
            selected: false,
        },
        {
            id: 2,
            name: "John Smith",
            designation: "Marketing Director",
            company: "Solutions Co.",
            comment: "An incredible experience from start to finish. We've seen a significant ROI.",
            imageUrl:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBGzcd2UixQZtSw7aC6ayoLz4bQSqimL-ZyWb9r4hlH6Bx80WToPCzv_bWFY57Hmw1MZG4wmjdOU6A5Ww30xRM_RPg5wj-aQko5J8bHoAiaMJRLy2bd27CeY7ANnvRWkc8kBOwquyDwQsR4K5pm5H2wBTCQJQ3zsgoi5H78u1lTyIBqmPVHcUX2RkEBRT92ALBm7e4eOsKIShdriT8mY8YlClp8BFLcyzIBhiUxgWajaQTagRRl96TLCnWgZw7qoDirnm52SOU4YhJv",
            selected: false,
        },
        {
            id: 3,
            name: "Emily White",
            designation: "Project Manager",
            company: "Creative LLC",
            comment: "Highly recommended for any team looking to streamline their workflow. A game-changer.",
            imageUrl:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDM11ZLFS2UB2n2nj9LBCqSLObrkt5dLqCIR_sKjCOUFagWwYAYQAu2NUc49KV0_poXnKICLeXNLU79U8vG1LkSc62nFbjngpFYPjkFNccg5b2T5uctb-thZ_wX0jfNVO4OQ01_VegWVzetL7ksuQ72zUxP7wB0Nr6HpC8lYr8szcrxl_UbIo_FSaHfYCXYnGo3B0Dr5s1TiMqT51eK9F9BkWjX-9rdaICrnRjF4o9JSPDEP_wBmdSJk2sH8zBfiA1Q9NIDroz7xFxM",
            selected: false,
        },
        {
            id: 4,
            name: "Michael Brown",
            designation: "Developer",
            company: "Tech Forward",
            comment: "The best tool we've ever used, hands down. The support team is also fantastic.",
            imageUrl:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuA5SKth7Mp0Vwu9y0nj0G0aq8WkzpzkHt1pcN3jdWY4t2OscuHyXjLAazp_zYdLiN5hS1SDPn6ml7o0BWCiH-u_iGVD98dG2Cbvhv4QAQJmJNYeifs9m1G-cHrLB_xWqHMqxnD_5QMOFqKFaZ4LTKioEcEIy0yQj5iL1ZbMHBBxnNIqdTgg2635U677RRhj-gdnS90RWJznoLGWrMsXyjjn0nmtKEhR98pZtZPRNQYUU4zoWztIniFbU3URSy9wGHX78yA8v1LJhtZz",
            selected: false,
        },
    ]);

    const [searchQuery, setSearchQuery] = useState("");

    // Handle individual checkbox selection
    const handleSelectTestimonial = (id: number) => {
        setTestimonials((prev) => prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)));
    };

    // Filter testimonials based on search and status

    // Handle delete testimonial
    const handleDeleteTestimonial = (id: number) => {
        if (confirm("Are you sure you want to delete this testimonial?")) {
            setTestimonials((prev) => prev.filter((item) => item.id !== id));
        }
    };


    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 font-sans">
            <div className="flex">
                {/* Sidebar Component */}
                <AdminSidebar />

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="mx-auto max-w-7xl">
                        {/* Page Heading */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-3xl font-bold tracking-tight text-slate-800">Testimonial Management</h1>
                                <p className="text-slate-600">Manage testimonials for the landing page.</p>
                            </div>
                            <Link
                                href="/admins/testimonial/new"
                                className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 h-10 px-4 text-white text-sm font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-200"
                            >
                                <span className="material-symbols-outlined text-lg">add</span>
                                <span>Add New Testimonial</span>
                            </Link>
                        </div>

                        {/* Search and Filter Bar */}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            {/* Search Bar */}
                            <div className="grow min-w-72">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
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
                                                    <th scope="col" className="py-4 pl-6 pr-3">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-slate-300 bg-transparent text-blue-500 focus:ring-blue-400"
                                                        />
                                                    </th>
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
                                                {testimonials.map((testimonial) => (
                                                    <tr
                                                        key={testimonial.id}
                                                        className={`hover:bg-slate-50 transition-colors duration-150 ${
                                                            testimonial.selected ? "bg-blue-50" : ""
                                                        }`}
                                                    >
                                                        <td className="whitespace-nowrap py-4 pl-6 pr-3">
                                                            <input
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-slate-300 bg-transparent text-blue-500 focus:ring-blue-400"
                                                                checked={testimonial.selected}
                                                                onChange={() => handleSelectTestimonial(testimonial.id)}
                                                            />
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-4">
                                                            <div className="flex items-center">
                                                                <div className="h-11 w-11 shrink-0">
                                                                    <div
                                                                        className="h-11 w-11 rounded-full bg-cover bg-center border-2 border-white shadow-sm"
                                                                        style={{
                                                                            backgroundImage: `url(${testimonial.imageUrl})`,
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
                                                                <button
                                                                    className="text-slate-500 hover:text-blue-600 transition-colors duration-200 p-1.5 hover:bg-blue-50 rounded-lg"
                                                                    title="View"
                                                                >
                                                                    <span className="material-symbols-outlined text-lg">
                                                                        visibility
                                                                    </span>
                                                                </button>
                                                                <Link
                                                                    href={`/admins/testimonial/edit/${testimonial.id}`}
                                                                    className="text-slate-500 hover:text-blue-600 transition-colors duration-200 p-1.5 hover:bg-blue-50 rounded-lg"
                                                                    title="Edit"
                                                                >
                                                                    <span className="material-symbols-outlined text-lg">
                                                                        edit
                                                                    </span>
                                                                </Link>
                                                                <button
                                                                    className="text-slate-500 hover:text-red-600 transition-colors duration-200 p-1.5 hover:bg-red-50 rounded-lg"
                                                                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                                                                    title="Delete"
                                                                >
                                                                    <span className="material-symbols-outlined text-lg">
                                                                        delete
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table Footer - Show selected count */}
                        {testimonials.some((item) => item.selected) && (
                            <div className="mt-4 flex items-center justify-between rounded-xl bg-linear-to-r from-blue-50 to-blue-100 p-4 border-2 border-blue-200">
                                <div className="text-sm text-blue-700">
                                    {testimonials.filter((item) => item.selected).length} testimonial(s) selected
                                </div>
                                <div className="flex gap-3">
                                    <button className="text-sm font-medium text-blue-700 hover:text-blue-800 px-3 py-1.5 hover:bg-blue-200 rounded-lg transition-colors duration-200">
                                        Publish Selected
                                    </button>
                                    <button className="text-sm font-medium text-red-700 hover:text-red-800 px-3 py-1.5 hover:bg-red-200 rounded-lg transition-colors duration-200">
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
