"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { loginUser } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await dispatch(loginUser({ email, password }));

        if (res.meta.requestStatus === "fulfilled") {
            toast.success("Login Successful");
            router.push("/admins/faq");
        } else {
            toast.error(res.payload as string);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white font-body text-text-main">
            {/* --- Left Side (Image) --- */}

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
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`group relative flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-[#2075FF] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all bg-gray-500 cursor-pointer ${
                                loading ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
            <div
                className="hidden lg:block lg:w-1/2 bg-cover bg-center relative"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDhc-H3_Ap0CUPWH1rPyehF5-gpapB6wHqDoAYqG9UhdidqB5SR3iQD-dd-aNO5UnoHcDROsBK6mlZ8WkZkAg6nimhaTcZcWvKGQEjU9diXfrkNlizrfTjgG6i7e3AarFtjMTncd8JbpGVOJToitBA8hNfYxUKCAvgvExYAEApL94GjF4TKt2Az5S6HwlmEj9aZZ24NnyMzFpEXqz3rjk-MTSnyJJ_SZrfG2IbAL-sW8cpW84KQCrCifGUIQ6NHdJ_1fGGLyoxuJkQC')",
                }}
            >
                <div className="absolute inset-0 bg-black/10"></div>
            </div>
        </div>
    );
};

export default LoginPage;
