"use client";

import AdminSidebar from "@/app/components/AdminSidebar";
import { ArrowLeft, Camera, Trash } from "lucide-react";
import Image from "next/image";
import { useState, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { createTestimonial } from "@/app/store/testimonialSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

interface TestimonialFormData {
    comment: string;
    name: string;
    designation: string;
    company: string;
    image: File | null;
}

const TestimonialAddPage = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { loading } = useSelector((state: RootState) => state.testimonial);

    const [testimonial, setTestimonial] = useState<TestimonialFormData>({
        comment: "",
        name: "",
        designation: "",
        company: "",
        image: null,
    });

    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setTestimonial((prev) => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) return toast.error("Image must be less than 2MB");
        if (!file.type.startsWith("image/")) return toast.error("Invalid image");

        setTestimonial((prev) => ({ ...prev, image: file }));

        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleDeleteImage = () => {
        setTestimonial((prev) => ({ ...prev, image: null }));
        setPreviewUrl("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSave = async () => {
        if (!testimonial.comment.trim() || !testimonial.name.trim()) return toast.error("Comment and name are required");

        if (!testimonial.image) return toast.error("Image is required");

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("comment", testimonial.comment);
            formData.append("name", testimonial.name);
            formData.append("designation", testimonial.designation);
            formData.append("company", testimonial.company);
            formData.append("image", testimonial.image);

            await dispatch(createTestimonial(formData)).unwrap();
            toast.success("Testimonial created!");
            router.push("/admins/testimonial");
        } catch (error: any) {
            toast.error(error?.message || "Failed to create testimonial");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => router.push("/admins/testimonial");

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 font-sans">
            <div className="lg:flex">
                <AdminSidebar />

                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <Link
                                href="/admins/testimonial"
                                className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Add Testimonial</h1>
                                <p className="text-slate-600 text-sm md:text-base mt-1">Create a new testimonial entry.</p>
                            </div>
                        </div>

                        {/* Responsive Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                            {/* Form Section */}
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-slate-200">
                                    {/* Comment */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold" htmlFor="comment">
                                            Comment <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="comment"
                                            rows={5}
                                            placeholder="Share your testimonial..."
                                            className="rounded-xl border-2 bg-slate-50 border-slate-200 p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={testimonial.comment}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {/* Two inputs row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold" htmlFor="name">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="e.g., John Doe"
                                                className="rounded-xl border-2 bg-slate-50 border-slate-200 px-4 py-3"
                                                value={testimonial.name}
                                                onChange={handleInputChange}
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold" htmlFor="designation">
                                                Designation
                                            </label>
                                            <input
                                                id="designation"
                                                type="text"
                                                placeholder="e.g., CEO"
                                                className="rounded-xl border-2 bg-slate-50 border-slate-200 px-4 py-3"
                                                value={testimonial.designation}
                                                onChange={handleInputChange}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>

                                    {/* Company */}
                                    <div className="flex flex-col gap-2 mt-4">
                                        <label className="text-sm font-semibold" htmlFor="company">
                                            Company
                                        </label>
                                        <input
                                            id="company"
                                            type="text"
                                            placeholder="e.g., Acme Inc."
                                            className="rounded-xl border-2 bg-slate-50 border-slate-200 px-4 py-3"
                                            value={testimonial.company}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Author's Image *</label>

                                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-2 border-dashed border-slate-300 hover:border-blue-400 transition">
                                    {/* Hidden input */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={isSubmitting}
                                    />

                                    {/* Preview / Placeholder */}
                                    {previewUrl ? (
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4">
                                            <Image
                                                fill
                                                src={previewUrl}
                                                className="rounded-full object-cover border-4 border-white shadow-lg"
                                                alt="Preview"
                                                loading="lazy"
                                                priority={false}
                                            />
                                            <button
                                                onClick={handleDeleteImage}
                                                className="absolute bottom-0 right-0 bg-red-600 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow hover:bg-red-700"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto flex items-center justify-center rounded-full bg-slate-100 border border-dashed border-slate-300 mb-4">
                                            <Camera size={38} className="text-slate-400" />
                                        </div>
                                    )}

                                    {/* Upload / Change */}
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isSubmitting}
                                        className="w-full py-3 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700 transition"
                                    >
                                        {previewUrl ? "Change Image" : "Upload Image"}
                                    </button>

                                    <p className="text-xs text-slate-500 mt-3 text-center">
                                        Recommended 200×200px, max 2MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Buttons */}
                        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={handleCancel}
                                disabled={isSubmitting}
                                className="px-6 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 shadow-sm"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={isSubmitting}
                                className="px-6 py-3 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Testimonial"
                                )}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TestimonialAddPage;
