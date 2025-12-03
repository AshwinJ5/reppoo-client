"use client";
import AdminSidebar from "@/app/components/AdminSidebar";
import { Camera, Trash } from "lucide-react";
import Image from "next/image";
import { useState, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { createTestimonial } from "@/app/store/testimonialSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
        setTestimonial((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error("File size should be less than 2MB");
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }

        setTestimonial((prev) => ({
            ...prev,
            image: file,
        }));

        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleDeleteImage = () => {
        setTestimonial((prev) => ({ ...prev, image: null }));
        setPreviewUrl("");

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleChangeImage = () => fileInputRef.current?.click();

    const handleSave = async () => {
        if (!testimonial.comment.trim() || !testimonial.name.trim()) {
            toast.error("Comment and name are required");
            return;
        }

        if (!testimonial.image) {
            toast.error("Image is required");
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("comment", testimonial.comment);
            formData.append("name", testimonial.name);
            formData.append("designation", testimonial.designation);
            formData.append("company", testimonial.company);
            formData.append("image", testimonial.image);

            await dispatch(createTestimonial(formData)).unwrap();

            toast.success("Testimonial created successfully!");
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
            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-slate-800">Add Testimonial</h1>
                            <p className="text-slate-600 mt-2">Create a new testimonial entry.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-sm font-semibold text-slate-700" htmlFor="comment">
                                            Comment <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="comment"
                                            rows={6}
                                            placeholder="Share your testimonial..."
                                            className="w-full rounded-xl border-2 bg-slate-50 border-slate-200 p-4"
                                            value={testimonial.comment}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div className="flex flex-col gap-3">
                                            <label className="text-sm font-semibold" htmlFor="name">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="e.g., John Doe"
                                                className="w-full rounded-xl border-2 bg-slate-50 border-slate-200 px-4 py-3"
                                                value={testimonial.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <label className="text-sm font-semibold" htmlFor="designation">
                                                Designation
                                            </label>
                                            <input
                                                id="designation"
                                                type="text"
                                                placeholder="e.g., CEO"
                                                className="w-full rounded-xl border-2 bg-slate-50 border-slate-200 px-4 py-3"
                                                value={testimonial.designation}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 mt-6">
                                        <label className="text-sm font-semibold" htmlFor="company">
                                            Company
                                        </label>
                                        <input
                                            id="company"
                                            type="text"
                                            placeholder="e.g., Acme Inc."
                                            className="w-full rounded-xl border-2 bg-slate-50 border-slate-200 px-4 py-3"
                                            value={testimonial.company}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* IMAGE UPLOAD SECTION */}
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-semibold">{"Author's Image"}</label>

                                <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-slate-300 hover:border-blue-400 border-dashed text-center">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={isSubmitting}
                                    />

                                    {previewUrl ? (
                                        <div className="relative w-40 h-40 mx-auto mb-6">
                                            <Image
                                                fill
                                                className="rounded-full object-cover"
                                                src={previewUrl}
                                                alt="Preview"
                                            />
                                            <button
                                                className="absolute bottom-0 right-0 p-2 bg-red-600 rounded-full text-white"
                                                onClick={handleDeleteImage}
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center rounded-full border-4 border-dashed border-slate-300 hover:border-blue-400">
                                            <Camera size={40} className="text-slate-400" />
                                        </div>
                                    )}

                                    <button
                                        onClick={handleChangeImage}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md cursor-pointer"
                                    >
                                        {previewUrl ? "Change Image" : "Upload Image"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t flex justify-end gap-4">
                            <button onClick={handleCancel} className="px-6 py-3 border rounded-xl">
                                Cancel
                            </button>

                            <button onClick={handleSave} className="px-6 py-3 bg-blue-600 text-white rounded-xl">
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TestimonialAddPage;
