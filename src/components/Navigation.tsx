import { motion, AnimatePresence } from 'motion/react';
import { Code2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { DarkModeToggle } from './ThemeProvider';

interface NavigationProps {
  scrolled: boolean;
}

export function Navigation({ scrolled }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Asosiy', href: '#hero' },
    { label: 'Kurslar', href: '#courses' },
    { label: 'Bitiruvchilar', href: '#graduates' },
    { label: 'Mentorlar', href: '#mentors' },
    { label: 'Videolar', href: '#videos' },
    { label: 'FAQ', href: '#faq' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg shadow-red-600/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('#hero')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-red-600 to-red-700 p-2.5 rounded-xl">
                <Code2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <span className="text-gray-900 dark:text-white block">IT_HOUSE</span>
              <span className="text-red-600 text-xs">O'quv Markazi</span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
            
            {/* Theme Toggle Button */}
           <DarkModeToggle />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#contact')}
              className="ml-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-600/30"
            >
              Bog'lanish
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-900 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/98 backdrop-blur-md border-t border-gray-800"
          >
            <div className="px-4 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all mt-4"
              >
                Bog'lanish
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}