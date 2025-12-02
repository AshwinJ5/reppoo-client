import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 100]);

    return (
        <motion.header
            className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 md:py-6 sticky top-0 z-50 bg-[#FCFCFD]/95 backdrop-blur-sm"
            style={{ y }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Image src={"/logo.svg"} width={30} height={30} alt="logo" className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-lg md:text-xl font-bold text-gray-900">Reppoo</span>
            </motion.div>
            <Link href={'/login'}>
            <motion.button
                className="text-sm md:text-base text-gray-700 hover:text-gray-900 font-semibold cursor-pointer transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                >
                Admin login
            </motion.button>
                </Link>
        </motion.header>
    );
};

export default Navbar;
