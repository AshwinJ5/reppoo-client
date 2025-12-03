"use client";
import AdminSidebar from "@/app/components/AdminSidebar";
import { Camera, Trash } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchSingleTestimonial, updateTestimonial, TestimonialItem } from "@/app/store/testimonialSlice";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

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

    useEffect(() => {
        if (testimonialId) {
            dispatch(fetchSingleTestimonial(testimonialId as string));
        }
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
        } else if (list.length === 0 && testimonialId) {
            const fetchTestimonial = async () => {
                try {
                    await dispatch(fetchSingleTestimonial(testimonialId as string)).unwrap();
                } catch (error) {
                    toast.error("Failed to fetch testimonial");
                    router.push("/admins/testimonial");
                }
            };
            fetchTestimonial();
        }
    }, [testimonialId, list, dispatch, router]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setTestimonial((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size should be less than 2MB");
                return;
            }

            if (!file.type.startsWith("image/")) {
                toast.error("Please select an image file");
                return;
            }

            setTestimonial((prev) => ({
                ...prev,
                image: file,
                existingImage: "",
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setTestimonial((prev) => ({
            ...prev,
            file: null,
            existingImage: "",
        }));
        setPreviewUrl("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleChangeImage = () => {
        fileInputRef.current?.click();
    };

    const handleSave = async () => {
        if (!testimonial.comment.trim() || !testimonial.name.trim()) {
            toast.error("Comment and name are required");
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("comment", testimonial.comment);
            formData.append("name", testimonial.name);
            formData.append("designation", testimonial.designation);
            formData.append("company", testimonial.company);

            if (testimonial.image) {
                formData.append("image", testimonial.image);
            }

            await dispatch(
                updateTestimonial({
                    id: testimonialId as string,
                    formData,
                })
            ).unwrap();

            toast.success("Testimonial updated successfully!");
            router.push("/admins/testimonial");
        } catch (error: any) {
            console.error("Update error:", error);
            toast.error(error?.message || "Failed to update testimonial");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push("/admins/testimonial");
    };

    if (loading && !testimonial.comment) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 font-sans">
                <div className="flex">
                    <AdminSidebar />
                    <main className="flex-1 p-8">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex items-center justify-center h-64">
                                <div className="text-slate-600">Loading testimonial...</div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 font-sans">
            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-800">
                                Edit Testimonial
                            </h1>
                            <p className="text-slate-600 mt-2">Update the details for the testimonial below.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-sm font-semibold text-slate-700" htmlFor="comment">
                                            Comment <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            className="w-full resize-none rounded-xl text-slate-800 border-2 border-slate-200 bg-slate-50 p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition-all duration-200"
                                            id="comment"
                                            placeholder="Share your testimonial experience..."
                                            rows={6}
                                            value={testimonial.comment}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div className="flex flex-col gap-3">
                                            <label className="text-sm font-semibold text-slate-700" htmlFor="name">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                className="w-full rounded-xl text-slate-800 border-2 border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition-all duration-200"
                                                id="name"
                                                placeholder="e.g., Jane Doe"
                                                type="text"
                                                value={testimonial.name}
                                                onChange={handleInputChange}
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <label className="text-sm font-semibold text-slate-700" htmlFor="designation">
                                                Designation <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                className="w-full rounded-xl text-slate-800 border-2 border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition-all duration-200"
                                                id="designation"
                                                placeholder="e.g., CEO"
                                                type="text"
                                                value={testimonial.designation}
                                                onChange={handleInputChange}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 mt-6">
                                        <label className="text-sm font-semibold text-slate-700" htmlFor="company">
                                            Company <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="w-full rounded-xl text-slate-800 border-2 border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition-all duration-200"
                                            id="company"
                                            placeholder="e.g., Acme Inc."
                                            type="text"
                                            value={testimonial.company}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-semibold text-slate-700">{"Author's Image"}</label>
                                <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-dashed border-slate-300 hover:border-blue-400 transition-all duration-300 text-center">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={isSubmitting}
                                    />

                                    {previewUrl || testimonial.existingImage ? (
                                        <div className="relative w-40 h-40 mx-auto mb-6 group">
                                            <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                                            <div className="relative w-full h-full">
                                                <Image
                                                    fill
                                                    className="rounded-full object-cover border-4 border-white shadow-lg"
                                                    src={previewUrl || testimonial.existingImage || "/logo.svg"}
                                                    alt={`Profile picture of ${testimonial.name || "user"}`}
                                                    sizes="160px"
                                                />
                                                <button
                                                    className="absolute bottom-0 right-0 flex items-center justify-center w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-full text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    onClick={handleDeleteImage}
                                                    type="button"
                                                    aria-label="Delete image"
                                                    disabled={isSubmitting}
                                                >
                                                    <Trash size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center rounded-full bg-linear-to-br from-slate-100 to-slate-200 border-4 border-dashed border-slate-300 hover:border-blue-400 transition-all duration-300">
                                            <Camera size={48} className="text-slate-400" />
                                        </div>
                                    )}

                                    <button
                                        className="px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                        onClick={handleChangeImage}
                                        type="button"
                                        disabled={isSubmitting}
                                    >
                                        {previewUrl || testimonial.existingImage ? "Change Image" : "Upload Image"}
                                    </button>
                                    <p className="text-xs text-slate-500 mt-4">Recommended: 200x200px, max 2MB.</p>
                                    {testimonial.image && (
                                        <p className="text-xs text-green-600 mt-2">
                                            New image selected: {testimonial.image.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-200 flex justify-end gap-4">
                            <button
                                className="px-6 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border-2 border-slate-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleCancel}
                                type="button"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-3 text-sm font-medium text-white bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                onClick={handleSave}
                                type="button"
                                disabled={isSubmitting}
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
