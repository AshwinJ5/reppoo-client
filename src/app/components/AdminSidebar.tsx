"use client";

import { LogOut, MessageCircle, Star, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

interface NavItem {
    href: string;
    label: string;
    icon: LucideIcon;
}

const AdminSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const navItems: NavItem[] = [
        { href: "/admins/testimonial", label: "Testimonials", icon: Star },
        { href: "/admins/faq", label: "FAQs", icon: MessageCircle },
        { href: "/admins/about", label: "About", icon: MessageCircle },
    ];

    const isActive = (href: string) => {
        if (href === "/admins/dashboard") return pathname === href;
        return pathname.startsWith(href);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        router.push("/");
    };

    return (
        <>
            <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-slate-900 text-white sticky top-0 z-50 shadow-md">
                <div className="flex items-center gap-2">
                    <Image src={"/logo.svg"} width={28} height={28} alt="logo" />
                    <p className="font-semibold">Reppoo Admin</p>
                </div>
                <button onClick={() => setOpen(true)}>
                    <Menu className="w-7 h-7" />
                </button>
            </div>

            {open && (
                <div 
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed lg:static top-0 left-0 h-screen w-64 
                    bg-linear-to-b from-slate-800 to-slate-900 text-white shadow-xl
                    flex flex-col justify-between p-6 z-50
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <button
                    onClick={() => setOpen(false)}
                    className="lg:hidden absolute top-4 right-4 text-white"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col gap-6 mt-6 lg:mt-0">
                    <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                        <Image src={"/logo.svg"} width={30} height={30} alt="logo" />
                        <div className="flex flex-col">
                            <h1 className="text-white text-lg font-semibold">Reppoo</h1>
                            <p className="text-blue-200 text-xs">Admin Panel</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                                        active
                                            ? "bg-linear-to-r from-blue-500/20 to-blue-600/20 text-white border-l-4 border-blue-500"
                                            : "text-slate-300 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <p className="text-sm font-medium">{item.label}</p>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                    >
                        <LogOut className="w-5 h-5" />
                        <p className="text-sm font-medium">Logout</p>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
