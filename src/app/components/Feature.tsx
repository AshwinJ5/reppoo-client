"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

interface FeatureData {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  createdAt: string;
}

interface FeatureApiResponse {
  statusCode: number;
  data: {
    message: string;
    success: boolean;
    result: FeatureData;
  };
  message: string;
}

const Feature = () => {
  const [featureData, setFeatureData] = useState<FeatureData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const fetchFeature = async () => {
    setIsLoading(true);
    setError(null);

    try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!baseUrl) {
      console.error("API Error: process.env.NEXT_PUBLIC_API_URL is undefined");
      setError("Configuration error: API URL missing");
      setIsLoading(false);
      return;
    }

    const cleanUrl = baseUrl.replace(/\/$/, "");
    const endpoint = `${cleanUrl}/feature`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch feature: ${response.status}`);
      }

      const data: FeatureApiResponse = await response.json();
      
      if (data.data.success) {
        setFeatureData(data.data.result);
      } else {
        throw new Error(data.message || "Failed to fetch feature");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching feature");
      console.error("Error fetching feature:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeature();
  }, []);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const LoadingSkeleton = () => (
    <motion.section
      className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
        <motion.div
          className="flex flex-col justify-between gap-6 md:gap-8"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
          }}
        >
          <div className="space-y-4 md:space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </motion.div>

        <motion.div
          className="bg-[#F4F5F6] rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, delay: 0.2 } },
          }}
        >
          <div className="relative aspect-video md:aspect-auto md:h-80">
            <div className="absolute inset-0 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );

  const ErrorDisplay = () => (
    <motion.section
      className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center py-12">
        <div className="rounded-lg bg-red-50 p-6 max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Feature</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => fetchFeature()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </motion.section>
  );

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    const url=process.env.NEXT_PUBLIC_API_BASE_URL
    console.log(`${url}/uploads/features/${imagePath}`);
    
    return `${url}/uploads/features/${imagePath}`;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      {isLoading && <LoadingSkeleton />}
      
      {error && <ErrorDisplay />}
      
      {!isLoading && !error && featureData && (
        <motion.section
          className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              className="flex flex-col justify-between gap-6 md:gap-8"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
              }}
            >
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  {featureData.title || "Maximizing Your Health Potential Together"}
                </h2>
                <div className="space-y-2">
                  <p className="text-[#23262F] font-medium text-lg">
                    {featureData.subtitle || "Smart Nutrition Planning"}
                  </p>
                  <p className="text-[#777E90] text-base leading-relaxed">
                    {showFullDescription 
                      ? featureData.description 
                      : truncateText(featureData.description, 200)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={toggleDescription}
                  className="text-black font-semibold cursor-pointer rounded-full hover:underline self-start"
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                </motion.button>
                
              </div>
            </motion.div>

            <motion.div
              className="bg-[#F4F5F6] rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, delay: 0.2 } },
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative aspect-video md:aspect-auto md:h-80">
                {featureData.image ? (
                  <Image
                    src={getImageUrl(featureData.image)}
                    fill
                    alt={featureData.subtitle || "Feature image"}
                    className="object-contain rounded-xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {!isLoading && !error && !featureData && (
        <motion.section
          className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center py-12">
            <div className="rounded-lg bg-gray-50 p-8 max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-800 mb-2">No Feature Available</h3>
              <p className="text-gray-600">Feature content will be added soon.</p>
            </div>
          </div>
        </motion.section>
      )}
    </>
  );
};

export default Feature;