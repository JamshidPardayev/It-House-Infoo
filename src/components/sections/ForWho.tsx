import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useCourseAbout } from "../../api/hooks/useCourseAbout";
import { useLang } from "../../context/LangContext";

export function ForWho() {
  const { t } = useLang();
  const { data, isLoading, isError } = useCourseAbout();


  type CourseAboutType = {
    title_uz: string;
    title_ru: string;
    title_en: string;
    description_uz: string;
    description_ru: string;
    description_en: string;
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center py-32 text-gray-500 dark:text-gray-300 z-[-100]">
        {t.loading || "Yuklanmoqda..."}
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center py-32 text-red-500 z-[-100]">
        {t.error || "Ma'lumotlarni yuklab bo‘lmadi"}
      </div>
    );

  return (
    <section
      id="forwho"
      className="py-24 bg-gradient-to-b from-white dark:from-black to-gray-100 dark:to-gray-900 relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            className="inline-block bg-purple-600/20 border border-purple-600/30 px-6 py-3 rounded-full mb-6"
          >
            <span className="text-purple-500">{t.forWho.badge}</span>
          </motion.div>

          <h2 className="text-black dark:text-white mb-6">
            {t.forWho.title1}{" "}
            <span className="text-purple-600">{t.forWho.title2}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t.forWho.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.map((audience) => (
            <motion.div
              key={audience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/5 to-white/10 hover:scale-[1.05] duration-300 shadow-md hover:shadow-lg  backdrop-blur-sm border border-white/10 rounded-2xl p-8  transition-all text-center cursor-pointer"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>

              <h3 className="dark:text-white mb-3">
                {audience[`title_${t.lang}` as keyof CourseAboutType] ||
                  audience.title_uz}
              </h3>
              <p className="text-gray-400">
                {audience[`description_${t.lang}` as keyof CourseAboutType] ||
                  audience.description_uz}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
