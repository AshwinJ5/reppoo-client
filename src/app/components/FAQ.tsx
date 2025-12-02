"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
}

interface FaqApiResponse {
  statusCode: number;
  data: {
    message: string;
    page: number;
    results: FaqItem[];
    totalCount: number;
    totalPages: number;
    success: boolean;
  };
  message: string;
}

const Faq = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFaqs = async (page: number = 1) => {
    setIsLoading(true);
    setError(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!baseUrl) {
      console.error("API Error: process.env.NEXT_PUBLIC_API_URL is undefined");
      setError("Configuration error: API URL missing");
      setIsLoading(false);
      return;
    }

    const cleanUrl = baseUrl.replace(/\/$/, "");
    const endpoint = `${cleanUrl}/faq?page=${page}`;

    console.log("Fetching from:", endpoint);

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: FaqApiResponse = await response.json();
      
      console.log("API Response:", data);

      if (data?.data?.results) {
        setFaqs(data.data.results);
        setTotalPages(data.data.totalPages || 1);
        setCurrentPage(data.data.page || 1);
        
        if (data.data.results.length > 0 && !openFaq) {
          setOpenFaq(data.data.results[0]._id);
        }
      } else {
        console.warn("Unexpected API structure", data);
        setFaqs([]); 
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      console.error("Fetch error:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchFaqs(newPage);
    }
  };

  const handleFaqClick = (faqId: string) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-3 md:space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-[#FCFCFD] rounded-xl h-20 shadow-sm animate-pulse border border-gray-100"
        />
      ))}
    </div>
  );

  const Pagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <motion.section
      className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16"
      initial="hidden"
      animate="visible" 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <div className="max-w-md mx-auto text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Got answers to commonly asked questions about our AI health assistant App.
        </p>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="text-center py-8 text-red-600 bg-red-50 rounded-lg border border-red-100">
          <p>{error}</p>
          <button onClick={() => fetchFaqs()} className="mt-2 underline hover:text-red-800">
            Retry
          </button>
        </div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No FAQs found.</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq._id;
              return (
                <motion.div
                  key={faq._id}
                  className="bg-[#FCFCFD] rounded-xl md:rounded-2xl shadow-sm overflow-hidden border border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <button
                    onClick={() => handleFaqClick(faq._id)}
                    className="w-full flex justify-between items-center p-4 md:p-6 text-left cursor-pointer hover:bg-gray-50/50 transition"
                  >
                    <span className={`font-semibold text-sm md:text-base transition-colors duration-300 ${isOpen ? "text-[#3772FF]" : "text-gray-900"}`}>
                      {faq.question}
                    </span>
                    <div className="shrink-0 ml-4">
                      {isOpen ? <Minus className="w-5 h-5 text-gray-500" /> : <Plus className="w-5 h-5 text-gray-500" />}
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6 text-gray-600 text-sm md:text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
          <Pagination />
        </>
      )}
    </motion.section>
  );
};

export default Faq;