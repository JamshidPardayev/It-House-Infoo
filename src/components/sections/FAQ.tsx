import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Noldan boshlasam bo\'ladimi?',
      answer: 'Albatta! Bizning kurslar mutlaqo noldan boshlanadi. Hech qanday oldindan bilim talab qilinmaydi.',
    },
    {
      question: 'Kurslar qancha davom etadi?',
      answer: 'Kurs davomiyligi 5 oydan 10 oygacha. Frontend 6 oy, Backend 8 oy, Full Stack 10 oy.',
    },
    {
      question: 'Bo\'lib-bo\'lib to\'lash mumkinmi?',
      answer: 'Ha! 3, 6 yoki 12 oyga bo\'lib to\'lashingiz mumkin. Foizsiz!',
    },
    {
      question: 'Ish topishga yordam berasizlarmi?',
      answer: 'Ha, CV tayyorlash, interview tayyorgarlik va ishga joylashishda to\'liq yordam beramiz.',
    },
    {
      question: 'Online yoki offline?',
      answer: 'Ikkalasi ham mavjud. Siz o\'zingizga qulay formatni tanlashingiz mumkin.',
    },
    {
      question: 'Sertifikat beriladimi?',
      answer: 'Ha, davlat tomonidan tan olingan rasmiy sertifikat beriladi.',
    },
  ];

  return (
    <section id="faq" className="py-32 bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-black relative overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-indigo-600/20 border border-indigo-600/30 px-6 py-3 rounded-full mb-6"
          >
            <span className="text-indigo-500">Ko'p Beriladigan Savollar</span>
          </motion.div>
          
          <h2 className="text-black dark:text-white mb-6">
            Savol-<span className="text-indigo-600">Javoblar</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br shadow-md dark:shadow-none from-gray-200 to-gray-100 dark:from-white/5 dark:to-white/10 backdrop-blur-sm border border-gray-700/30 dark:border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between gap-4 text-left"
              >
                <h3 className="dark:text-white">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <div className="border-t border-white/10 pt-6">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}