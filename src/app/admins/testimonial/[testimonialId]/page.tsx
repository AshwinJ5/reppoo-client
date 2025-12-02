"use client";
import AdminSidebar from "@/app/components/AdminSidebar";
import Image from "next/image";
import React, { useState } from "react";

interface TestimonialData {
  comment: string;
  name: string;
  designation: string;
  company: string;
  imageUrl: string;
}

const TestimonialEditPage = () => {
  const [testimonial, setTestimonial] = useState<TestimonialData>({
    comment:
      "The service provided was exceptional. The team went above and beyond to deliver outstanding results. Highly recommended for anyone looking for professional solutions.",
    name: "Sarah Johnson",
    designation: "Marketing Director",
    company: "Innovate Solutions",
    imageUrl: "/logo.svg",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setTestimonial((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDeleteImage = () => {
    setTestimonial((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleChangeImage = () => {
    console.log("Change image clicked");
  };

  const handleSave = () => {
    console.log("Saving testimonial:", testimonial);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 font-sans">
      <div className="flex">
        {/* SideNavBar */}
        <AdminSidebar/>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* PageHeading */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-800">
                Edit Testimonial
              </h1>
              <p className="text-slate-600 mt-2">Update the details for the testimonial below.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                  {/* Text Area for Comment */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-slate-700" htmlFor="comment">
                      Comment
                    </label>
                    <textarea
                      className="w-full resize-none rounded-xl text-slate-800 border-2 border-slate-200 bg-slate-50 p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition-all duration-200"
                      id="comment"
                      placeholder="Share your testimonial experience..."
                      rows={6}
                      value={testimonial.comment}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Text Input for Name */}
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-semibold text-slate-700" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="w-full rounded-xl text-slate-800 border-2 border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition-all duration-200"
                        id="name"
                        placeholder="e.g., Jane Doe"
                        type="text"
                        value={testimonial.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Text Input for Designation */}
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-semibold text-slate-700" htmlFor="designation">
                        Designation
                      </label>
                      <input
                        className="w-full rounded-xl text-slate-800 border-2 border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition-all duration-200"
                        id="designation"
                        placeholder="e.g., CEO"
                        type="text"
                        value={testimonial.designation}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Text Input for Company */}
                  <div className="flex flex-col gap-3 mt-6">
                    <label className="text-sm font-semibold text-slate-700" htmlFor="company">
                      Company
                    </label>
                    <input
                      className="w-full rounded-xl text-slate-800 border-2 border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition-all duration-200"
                      id="company"
                      placeholder="e.g., Acme Inc."
                      type="text"
                      value={testimonial.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Image Uploader Section */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-700">{"Author's Image"}</label>
                <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-dashed border-slate-300 hover:border-blue-400 transition-all duration-300 text-center">
                  {testimonial.imageUrl ? (
                    <div className="relative w-40 h-40 mx-auto mb-6 group">
                      <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                      <div className="relative w-full h-full">
                        <Image
                          fill
                          className="rounded-full object-cover border-4 border-white shadow-lg"
                          src={testimonial.imageUrl}
                          alt={`Profile picture of ${testimonial.name}`}
                        />
                        <button
                          className="absolute bottom-0 right-0 flex items-center justify-center w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-full text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
                          onClick={handleDeleteImage}
                          type="button"
                          aria-label="Delete image"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center rounded-full bg-linear-to-br from-slate-100 to-slate-200 border-4 border-dashed border-slate-300 hover:border-blue-400 transition-all duration-300">
                      <span className="material-symbols-outlined text-slate-400 text-5xl">
                        person
                      </span>
                    </div>
                  )}
                  <button
                    className="px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    onClick={handleChangeImage}
                    type="button"
                  >
                    {testimonial.imageUrl ? "Change Image" : "Upload Image"}
                  </button>
                  <p className="text-xs text-slate-500 mt-4">Recommended: 200x200px, max 2MB.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 pt-8 border-t border-slate-200 flex justify-end gap-4">
              <button
                className="px-6 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border-2 border-slate-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-400"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 text-sm font-medium text-white bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                onClick={handleSave}
                type="button"
              >
                <span className="flex items-center gap-2">
                  Save Changes
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestimonialEditPage;