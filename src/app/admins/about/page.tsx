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

    /* eslint-disable react-hooks/set-state-in-effect */
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
    /* eslint-enable react-hooks/set-state-in-effect */

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        setImageFile(null);
        setFormData((prev) => ({ ...prev, image: "" }));
    };

    const handleSave = () => {
        const form = new FormData();
        form.append("title", formData.title);
        form.append("subtitle", formData.subtitle);
        form.append("description", formData.description);

        if (imageFile) {
            form.append("image", imageFile);
        }

        dispatch(updateFeature(form))
            .unwrap()
            .then(() => alert("Changes saved successfully!"))
            .catch(() => alert("Failed to update feature"));
    };

    const handleCancel = () => {
        window.history.back();
    };

    const currentImage =
        previewImage ||
        (formData.image ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/features/${formData.image}` : "");

    return (
        <div className="font-display bg-gray-50 min-h-screen">
            <div className="relative flex min-h-screen w-full">
                <AdminSidebar />

                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-end justify-between gap-4 pb-8">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Manage About Section</h1>
                                <p className="text-base text-gray-500">
                                    Update the title, subtitle, description, and image.
                                </p>
                            </div>

                            <div className="flex gap-2">
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

                        <div className="space-y-8 rounded-xl border border-gray-200 bg-white p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <label className="flex flex-col gap-2">
                                    <p className="text-gray-900 font-medium">Title</p>
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="rounded-lg border border-gray-300 px-4 py-2.5"
                                    />
                                </label>

                                <label className="flex flex-col gap-2">
                                    <p className="text-gray-900 font-medium">Subtitle</p>
                                    <input
                                        name="subtitle"
                                        value={formData.subtitle}
                                        onChange={handleInputChange}
                                        className="rounded-lg border border-gray-300 px-4 py-2.5"
                                    />
                                </label>
                            </div>

                            <label className="flex flex-col gap-2">
                                <p className="text-gray-900 font-medium">Description</p>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="rounded-lg border border-gray-300 px-4 py-2.5"
                                />
                            </label>

                            <div>
                                <p className="text-gray-900 font-medium pb-2">Image</p>
                                <div className="flex items-start gap-6">
                                    {currentImage ? (
                                        <div className="relative size-24 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={currentImage}
                                                alt="current-about-image"
                                                fill
                                                className="object-cover"
                                                loading="lazy"
                                                priority={false}
                                            />
                                        </div>
                                    ) : (
                                        <div className="size-24 rounded-lg bg-gray-100 flex items-center justify-center">
                                            <Upload />
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-2 flex-1">
                                        <div className="flex items-center gap-3">
                                            <label className="flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                                                <Upload />
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
                                                className="text-red-600 hover:bg-red-50 rounded-lg px-4 py-2 text-sm flex items-center"
                                            >
                                                <Trash className="mr-2" /> Remove
                                            </button>
                                        </div>

                                        <p className="text-sm text-gray-500">
                                            PNG/JPG/GIF up to 5MB — Recommended 1200×800px
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
