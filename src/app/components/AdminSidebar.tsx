import { LogOut, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";
interface NavItem {
    href: string;
    label: string;
    icon: LucideIcon;
}

const AdminSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const navItems: NavItem[] = [
        { href: "/admins/testimonial", label: "Testimonials", icon: Star },
        { href: "/admins/faq", label: "FAQs", icon: MessageCircle },
        // { href: "/admins/feature", label: "Features", icon: ChartBarStacked },
        // { href: "/admins/header", label: "Header", icon: Cpu },
    ];

    const isActive = (href: string) => {
        if (href === "/admins/dashboard") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        router.push("/");
    };

    return (
        <aside className="sticky top-0 h-screen w-64 bg-linear-to-b from-slate-800 to-slate-900 text-white shadow-xl flex flex-col justify-between p-6">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Image src={"/logo.svg"} width={30} height={30} alt="logo" className="w-6 h-6 md:w-8 md:h-8" />
                    <div className="flex flex-col">
                        <h1 className="text-white text-lg font-semibold leading-tight">Reppoo</h1>
                        <p className="text-blue-200 text-xs font-normal">Admin Panel</p>
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
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                                    active
                                        ? "bg-linear-to-r from-blue-500/20 to-blue-600/20 text-white border-l-4 border-blue-500"
                                        : "text-slate-300 hover:text-white hover:bg-white/10"
                                }`}
                            >
                                <span
                                    className="material-symbols-outlined text-xl"
                                    style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                                >
                                    <Icon />
                                </span>
                                <p className="text-sm font-medium leading-normal">{item.label}</p>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="flex flex-col gap-2">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                    <LogOut />
                    <p className="text-sm font-medium leading-normal">Logout</p>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
