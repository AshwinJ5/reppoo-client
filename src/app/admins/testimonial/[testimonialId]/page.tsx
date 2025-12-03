"use client";

import AdminSidebar from "@/app/components/AdminSidebar";
import { ArrowLeft, Camera, Trash } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchSingleTestimonial, updateTestimonial, TestimonialItem } from "@/app/store/testimonialSlice";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

interface TestimonialFormData {
    comment: string;
    name: string;
    designation: string;
    company: string;
    image?: File | null;
    existingImage?: string;
}

const TestimonialEditPage = () => {
    const router = useRouter();
    const { testimonialId } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const { list, loading } = useSelector((state: RootState) => state.testimonial);
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

    /* ---------------- FETCH DATA ---------------- */
    useEffect(() => {
        if (testimonialId) dispatch(fetchSingleTestimonial(testimonialId as string));
    }, [testimonialId, dispatch]);

    useEffect(() => {
        if (testimonialId && list.length > 0) {
            const testimonialData = list.find((item: TestimonialItem) => item._id === testimonialId);
            if (testimonialData) {
                setTestimonial({
                    comment: testimonialData.comment,
                    name: testimonialData.name,
                    designation: testimonialData.designation,
                    company: testimonialData.company,
                    image: null,
                    existingImage: testimonialData.file,
                });

                setPreviewUrl(`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/testimonials/${testimonialData.file}`);
            }
        }
    }, [testimonialId, list]);

    /* ---------------- INPUT HANDLERS ---------------- */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setTestimonial((prev) => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) return toast.error("File must be < 2MB");
            if (!file.type.startsWith("image/")) return toast.error("Invalid file");

            setTestimonial((prev) => ({ ...prev, image: file, existingImage: "" }));

            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setPreviewUrl("");
        setTestimonial((prev) => ({ ...prev, image: null, existingImage: "" }));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSave = async () => {
        if (!testimonial.comment.trim() || !testimonial.name.trim()) {
            toast.error("Comment & name required");
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("comment", testimonial.comment);
            formData.append("name", testimonial.name);
            formData.append("designation", testimonial.designation);
            formData.append("company", testimonial.company);
            if (testimonial.image) formData.append("image", testimonial.image);

            await dispatch(updateTestimonial({ id: testimonialId as string, formData })).unwrap();
            toast.success("Updated successfully!");
            router.push("/admins/testimonial");
        } catch (error: any) {
            toast.error(error?.message || "Failed to update");
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
                      <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <Link
                                href="/admins/testimonial"
                                className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                 <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
                                Edit Testimonial
                            </h1>
                            <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base">
                                Update testimonial details below.
                            </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-slate-200">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold">Comment *</label>
                                        <textarea
                                            rows={5}
                                            id="comment"
                                            value={testimonial.comment}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            placeholder="Write testimonial..."
                                            className="w-full rounded-xl border px-4 py-3 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold">Name *</label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={testimonial.name}
                                                onChange={handleInputChange}
                                                disabled={isSubmitting}
                                                placeholder="Person's name"
                                                className="rounded-xl border px-4 py-3 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold">Designation *</label>
                                            <input
                                                id="designation"
                                                type="text"
                                                value={testimonial.designation}
                                                onChange={handleInputChange}
                                                disabled={isSubmitting}
                                                placeholder="Role (e.g., CEO)"
                                                className="rounded-xl border px-4 py-3 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 mt-4">
                                        <label className="text-sm font-semibold">Company *</label>
                                        <input
                                            id="company"
                                            type="text"
                                            value={testimonial.company}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            placeholder="Company name"
                                            className="rounded-xl border px-4 py-3 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-semibold">Author Image</label>

                                <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border-2 border-dashed border-slate-300 hover:border-blue-400 transition">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        disabled={isSubmitting}
                                    />

                                    {previewUrl || testimonial.existingImage ? (
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4">
                                            <Image
                                                fill
                                                src={
                                                    previewUrl ||
                                                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/testimonials/${testimonial.existingImage}`
                                                }
                                                alt="Image"
                                                className="object-cover rounded-full border-4 border-white shadow-lg"
                                            />

                                            <button
                                                type="button"
                                                onClick={handleDeleteImage}
                                                disabled={isSubmitting}
                                                className="absolute bottom-0 right-0 bg-red-600 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md hover:bg-red-700"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto flex items-center justify-center rounded-full bg-slate-100 border border-dashed border-slate-300 mb-4">
                                            <Camera size={38} className="text-slate-400" />
                                        </div>
                                    )}

                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isSubmitting}
                                        type="button"
                                        className="w-full py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow transition"
                                    >
                                        {previewUrl || testimonial.existingImage ? "Change Image" : "Upload Image"}
                                    </button>

                                    <p className="text-xs text-slate-500 mt-2 text-center">
                                        Recommended: 200x200px — Max 2MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-300 flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={handleCancel}
                                disabled={isSubmitting}
                                className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 shadow-sm"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={isSubmitting}
                                className="px-6 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow flex items-center gap-2 justify-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TestimonialEditPage;
