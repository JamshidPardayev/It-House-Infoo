import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { useEducationAbout } from "../../api/hooks/useEducationAbout";
import { useLanguage } from "../../context/LangContext";

type EducationAbout = {
  id: number;
  icon: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  created_at: string;
  updated_at: string;
};

export function WhyUs() {
  const { data, isLoading, isError } = useEducationAbout();
  const { t, getText } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 z-[-100]">
        <Loader2 className="animate-spin w-10 h-10 text-red-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10 z-[-100]">
        Ma'lumotlarni yuklashda xatolik yuz berdi 😔
      </div>
    );
  }

  return (
    <section
      id="whyus"
      className="py-24 bg-gray-50 dark:bg-black relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sarlavha qismi */}
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
            className="inline-block bg-red-600/20 border border-red-600/30 px-6 py-3 rounded-full mb-6"
          >
            <span className="text-red-500">{t.whyus.badge}</span>
          </motion.div>
          <h2 className="text-black dark:text-white mb-6 text-[20px] font-semibold">
            <span className="text-red-600">{t.whyus.title}</span>
          </h2>
        </motion.div>

        {/* API ma'lumotlari */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((item: EducationAbout) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-transparent dark:bg-linear-to-b dark:from-white/5 dark:to-white/10 hover:translate-y-[-10px] duration-300 border-none backdrop-blur-sm border dark:border-white/10 rounded-2xl p-8 transition-all"
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 shadow-md">
                <img
                  src={item.icon}
                  alt={getText(item)}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="dark:text-white text-lg font-semibold mb-3">
                {getText({
                  title_uz: item.title_uz,
                  title_ru: item.title_ru,
                  title_en: item.title_en,
                })}
              </h3>

              {/* Description */}
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                {getText({
                  description_uz: item.description_uz,
                  description_ru: item.description_ru,
                  description_en: item.description_en,
                })}
              </p>

              {/* Sana */}
              <p className="text-xs text-gray-400">
                {item.created_at.split("T")[0]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
