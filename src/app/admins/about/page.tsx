"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AdminSidebar from "@/app/components/AdminSidebar";
import { Trash, Upload } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchFeature, updateFeature } from "@/app/store/featureSlice";

const AboutSectionManagement = () => {
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.feature);

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        image: "",
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        dispatch(fetchFeature());
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title,
                subtitle: data.subtitle,
                description: data.description,
                image: data.image,
            });
        }
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setPreviewImage(null);
        setFormData((prev) => ({ ...prev, image: "" }));
    };

    const handleSave = () => {
        const form = new FormData();
        form.append("title", formData.title);
        form.append("subtitle", formData.subtitle);
        form.append("description", formData.description);

        if (imageFile) form.append("image", imageFile);

        dispatch(updateFeature(form))
            .unwrap()
            .then(() => alert("Changes saved successfully!"))
            .catch(() => alert("Failed to update feature"));
    };

    const handleCancel = () => window.history.back();

    const currentImage =
        previewImage ||
        (formData.image ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/features/${formData.image}` : "");

    return (
        <div className="font-display bg-gray-50 min-h-screen">
            <div className="lg:flex w-full min-h-screen">
                <AdminSidebar />

                <main className="flex-1 p-4 sm:p-6 md:p-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 md:pb-8">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage About Section</h1>
                                <p className="text-gray-600 text-sm md:text-base">
                                    Update the title, subtitle, description & image.
                                </p>
                            </div>

                            <div className="flex gap-2 flex-col sm:flex-row">
                                <button
                                    onClick={handleCancel}
                                    className="h-10 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="h-10 rounded-lg bg-blue-600 px-4 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-6 md:p-8 shadow">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <label className="flex flex-col gap-1">
                                    <span className="text-gray-900 font-medium">Title</span>
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-200"
                                    />
                                </label>

                                <label className="flex flex-col gap-1">
                                    <span className="text-gray-900 font-medium">Subtitle</span>
                                    <input
                                        name="subtitle"
                                        value={formData.subtitle}
                                        onChange={handleInputChange}
                                        className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-200"
                                    />
                                </label>
                            </div>

                            <label className="flex flex-col gap-1">
                                <span className="text-gray-900 font-medium">Description</span>
                                <textarea
                                    name="description"
                                    rows={6}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-200"
                                />
                            </label>

                            <div className="space-y-2">
                                <p className="text-gray-900 font-medium">Image</p>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                    {currentImage ? (
                                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100 shadow">
                                            <Image src={currentImage} alt="Feature image" fill className="object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center rounded-lg bg-gray-100 border border-dashed border-gray-300">
                                            <Upload size={32} className="text-gray-400" />
                                        </div>
                                    )}

                                    <div className="flex-1 flex flex-col gap-3">
                                        <label className="inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                            <Upload size={18} />
                                            <span className="ml-2">Change Image</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="sr-only"
                                                onChange={handleImageUpload}
                                            />
                                        </label>

                                        <button
                                            onClick={handleRemoveImage}
                                            className="text-red-600 hover:bg-red-50 rounded-lg px-4 py-2 text-sm flex items-center w-fit"
                                        >
                                            <Trash className="mr-2" size={16} /> Remove
                                        </button>

                                        <p className="text-xs sm:text-sm text-gray-500">
                                            PNG/JPG up to 5MB — Recommended: 1200×800px
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AboutSectionManagement;
