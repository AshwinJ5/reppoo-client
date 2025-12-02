"use client";
import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/app/components/AdminSidebar";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQListPage = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: 1,
      question: "What is the return policy?",
      answer: "You can return any item within 30 days of purchase, provided it is in its original condition with all tags attached. Refunds will be processed within 5-7 business days.",
    },
    {
      id: 2,
      question: "How do I track my order?",
      answer: "Once your order has shipped, you will receive an email with a tracking number and a link to track your package. You can also check your order status in your account dashboard.",
    },
    {
      id: 3,
      question: "Do you offer international shipping?",
      answer: "Currently, we are working on expanding our shipping options. This FAQ is a draft and will be updated soon with international shipping details and rates.",
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are secured with SSL encryption.",
    },
    {
      id: 5,
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team via email at support@example.com, through our contact form, or by phone at 1-800-123-4567 during business hours (9 AM - 5 PM EST).",
    },
    {
      id: 6,
      question: "Are there any discounts for bulk orders?",
      answer: "We offer special pricing for bulk orders. Please contact our sales team at sales@example.com with your requirements for a customized quote.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on search
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  // Handle delete FAQ
  const handleDeleteFaq = (id: number) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs(prev => prev.filter(faq => faq.id !== id));
    }
  };


  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 font-sans">
      <div className="flex">
        {/* Sidebar Component */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                  FAQ Management
                </h1>
                <p className="text-slate-600">
                  Manage the frequently asked questions for the landing page.
                </p>
              </div>
              <Link
                href="/admins/faq/new"
                className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 h-10 px-5 text-white text-sm font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-200"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                <span>Add New FAQ</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400">
                    search
                  </span>
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 text-slate-800 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 transition-all duration-200"
                  placeholder="Search by question or answer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-linear-to-r from-slate-50 to-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-slate-700 text-sm font-semibold">Question</th>
                      <th className="px-6 py-4 text-slate-700 text-sm font-semibold">Answer</th>
                      <th className="px-6 py-4 text-slate-700 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {faqs.map((faq) => (
                      <tr
                        key={faq.id}
                        className="hover:bg-slate-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 align-top">
                          <div className="text-slate-800 font-medium">
                            {faq.question}
                          </div>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <div className="text-slate-600 text-sm line-clamp-2">
                            {faq.answer}
                          </div>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <div className="flex items-center gap-3">
                            <button
                              className="text-slate-500 hover:text-blue-600 transition-colors duration-200 p-1.5 hover:bg-blue-50 rounded-lg"
                              title="Preview"
                            >
                              <span className="material-symbols-outlined text-xl">
                                visibility
                              </span>
                            </button>
                            <Link
                              href={`/admins/faq/edit/${faq.id}`}
                              className="text-slate-500 hover:text-blue-600 transition-colors duration-200 p-1.5 hover:bg-blue-50 rounded-lg"
                              title="Edit"
                            >
                              <span className="material-symbols-outlined text-xl">
                                edit
                              </span>
                            </Link>
                            <button
                              className="text-slate-500 hover:text-red-600 transition-colors duration-200 p-1.5 hover:bg-red-50 rounded-lg"
                              onClick={() => handleDeleteFaq(faq.id)}
                              title="Delete"
                            >
                              <span className="material-symbols-outlined text-xl">
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

            {/* Empty State */}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto max-w-md">
                  <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">
                    help_center
                  </span>
                  <h3 className="text-lg font-medium text-slate-700 mb-2">
                    No FAQs Found
                  </h3>
                  <p className="text-slate-500 mb-6">
                    {searchQuery
                      ? `No FAQs match your search for "${searchQuery}". Try a different keyword.`
                      : "No FAQs available. Add your first FAQ to get started."}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    
    </div>
  );
};

export default FAQListPage;