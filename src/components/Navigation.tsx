import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { DarkModeToggle } from "./ThemeProvider";
import { useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";
import logoWhite from "../assets/logoWhite.png";
import logoBlack from "../assets/logoBlack.png";
import { useLang } from "../context/LangContext";

interface NavigationProps {
  scrolled: boolean;
}

export function Navigation({ scrolled }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLang();
  const navigate = useNavigate();

  // 🔥 theme lokal holati
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // 🔥 DarkModeToggle theme o‘zgartirganda yangilanishi uchun
  useEffect(() => {
    const handler = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("theme-changed", handler);
    return () => window.removeEventListener("theme-changed", handler);
  }, []);

  const menuItems = [
    { label: t.menu.home, href: "#hero" },
    { label: t.menu.courses, href: "#courses" },
    { label: t.menu.graduates, href: "#graduates" },
    { label: t.menu.teachers, href: "#teachers" },
    { label: t.menu.videos, href: "#videos" },
    { label: t.menu.faq, href: "#faq" },
  ];

  const handleScroll = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const yOffset = -80;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: href } });
      }
    }, 150);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg shadow-red-600/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 🔥 Logo dark/light switch */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleScroll("#hero")}
          >
            <img
              src={theme === "dark" ? logoWhite : logoBlack}
              alt="Logo"
              className="h-[60px] max-sm:h-[50px]"
            />
          </motion.div>

          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => handleScroll(item.href)}
                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all text-sm cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}

            <LanguageSwitcher />
            <DarkModeToggle />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScroll("#contact")}
              className="ml-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-600/30 cursor-pointer"
            >
              {t.menu.contact}
            </motion.button>
          </div>

          <button
            className="lg:hidden text-gray-900 dark:text-white cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/98 backdrop-blur-md border-t border-gray-800"
          >
            <div className="flex justify-end mt-5 mr-5">
              <LanguageSwitcher />
              <DarkModeToggle />
            </div>

            <div className="px-4 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleScroll(item.href)}
                  className="block w-full text-left px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => handleScroll("#contact")}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all mt-4 cursor-pointer"
              >
                {t.menu.contact}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
