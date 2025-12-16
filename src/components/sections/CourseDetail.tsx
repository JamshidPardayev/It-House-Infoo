import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { Clock, Users, BookOpen, BadgeCheck } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useEffect, useState } from "react";
import { Contact } from "./Contact";
import { useCourseDetail } from "../../api/hooks/useCourseDetail";
import { useLang } from "../../context/LangContext";

export default function CourseDetail() {
  const { id } = useParams();
  const courseId = Number(id);
  const { data, isLoading, isError } = useCourseDetail(courseId);
  const course = data;
  const { t, getText } = useLang();

  // Dark mode
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const root = window.document.documentElement;
    if (savedTheme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    setIsDark(savedTheme === "dark");

    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    window.addEventListener("theme-changed", handleThemeChange);
    return () => window.removeEventListener("theme-changed", handleThemeChange);
  }, []);

  useEffect(() => {
    if (course) document.title = getText(course);
  }, [course]);

  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Yuklanmoqda...
        </p>
      </div>
    );

  if (isError || !course)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <p className="text-lg font-semibold text-red-500">Xatolik yuz berdi!</p>
      </div>
    );

  return (
    <div>
      <section
        className={`min-h-screen py-20 px-6 ${
          isDark
            ? "bg-gradient-to-b from-gray-950 to-gray-900"
            : "bg-gradient-to-b from-white to-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden shadow-xl mb-12"
          >
            <ImageWithFallback
              src={course.banner}
              alt={getText(course)}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-3">{getText(course)}</h1>
              <div className="flex gap-4 items-center text-sm">
                <span className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-[8px]">
                  <Clock className="w-4 h-4 text-red-500" /> {course.duration}{" "}
                  {t.courses.duration}
                </span>

                <span className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-[8px]">
                  <Users className="w-4 h-4 text-red-500" /> {course.students}{" "}
                  {t.courses.students}
                </span>

                <span className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-[8px]">
                  <BookOpen className="w-4 h-4 text-red-500" />{" "}
                  {course.modules?.length || 0} modul
                </span>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl shadow-lg p-8 mb-10 ${
              isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">{t.courses.more}</h2>
            <p className="leading-relaxed">
              {getText({
                title_uz: course.description_uz,
                title_ru: course.description_ru,
                title_en: course.description_en,
              })}
            </p>
          </motion.div>

          {/* Technologies */}
          {course.technologies?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`rounded-2xl shadow-lg p-8 mb-10 ${
                isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-6">
                {t?.courses?.technologies}
              </h2>
              <div className="flex flex-wrap gap-4">
                {course.technologies.map((tech) => (
                  <div
                    key={tech.id}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-800"
                    }`}
                  >
                    <div className="w-[30px] h-[30px] overflow-hidden rounded">
                      <img
                        src={tech.icon}
                        alt={getText(tech)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{getText(tech)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Modules */}
          {course.modules?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`rounded-2xl shadow-lg p-8 ${
                isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-6">{t?.courses?.modules}</h2>
              <div className="flex flex-col gap-4">
                {course.modules.map((mod) => (
                  <div
                    key={mod.id}
                    className={`border rounded-xl p-4 ${
                      isDark ? "border-gray-600" : "border-gray-300"
                    }`}
                  >
                    <h3 className="text-xl font-semibold text-red-600 mb-2">
                      {getText(mod)}
                    </h3>
                    {mod.themes?.length ? (
                      <ul>
                        {mod.themes.map((theme: any) => (
                          <li
                            key={theme.id}
                            className="flex items-center gap-2 mt-2"
                          >
                            <BadgeCheck className="text-green-500" />
                            {getText(theme)}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Contact />
    </div>
  );
}
