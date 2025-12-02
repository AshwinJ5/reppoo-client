"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginResponse {
    success: boolean;
    message: string;
    result: {
        token: string;
    };
}

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/admin/login`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data: LoginResponse = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            if (data.success) {
                setSuccess(data.message);

                localStorage.setItem("authToken", data.result.token);

                console.log("Login successful, token stored:", data.result.token);

                setEmail("");
                setPassword("");
                router.push("/admins/faq");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex min-h-screen w-full bg-white font-body text-text-main">
            <div
                className="hidden lg:block lg:w-1/2 bg-cover bg-center relative"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDhc-H3_Ap0CUPWH1rPyehF5-gpapB6wHqDoAYqG9UhdidqB5SR3iQD-dd-aNO5UnoHcDROsBK6mlZ8WkZkAg6nimhaTcZcWvKGQEjU9diXfrkNlizrfTjgG6i7e3AarFtjMTncd8JbpGVOJToitBA8hNfYxUKCAvgvExYAEApL94GjF4TKt2Az5S6HwlmEj9aZZ24NnyMzFpEXqz3rjk-MTSnyJJ_SZrfG2IbAL-sW8cpW84KQCrCifGUIQ6NHdJ_1fGGLyoxuJkQC')",
                }}
            >
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* --- Right Side (Form) --- */}
            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-8 py-12 sm:px-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="font-display text-4xl font-black tracking-tight text-text-main text-primary">
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">Sign in to continue your style journey.</p>
                    </div>

                    {/* Status Messages */}
                    {error && (
                        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200">{error}</div>
                    )}

                    {success && (
                        <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600 border border-green-200">
                            {success}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Email Address / Username / Phone number"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="relative block w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none sm:text-sm transition-colors"
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="relative block w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none sm:text-sm transition-colors"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-[#2075FF] bg-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all ${
                                isLoading
                                    ? "opacity-70 cursor-not-allowed bg-gray-400"
                                    : "bg-primary hover:bg-[#2075FF] cursor-pointer"
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Signing In...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
