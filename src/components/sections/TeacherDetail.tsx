import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  Linkedin,
  Github,
  Twitter,
  Briefcase,
  BookOpen,
  Medal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "../../context/LangContext";
import { useTeacherDetail } from "../../api/hooks/useTeacherDetail";
import { Contact } from "./Contact";

export default function TeacherDetail() {
  const { id } = useParams();
  const teacherId = Number(id);
  const { data: teacher, isLoading, isError } = useTeacherDetail(teacherId);
  const { t, getText } = useLang();

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
    if (teacher) {
      document.title =
        getText({
          name_uz: teacher.full_name_uz,
          name_ru: teacher.full_name_ru,
          name_en: teacher.full_name_en,
        }) ||
        teacher.full_name ||
        "Teacher";
    }
  }, [teacher, getText]);

  const loc = (uz?: string, ru?: string, en?: string, fallback?: string) =>
    getText({
      title_uz: uz || "",
      title_ru: ru || "",
      title_en: en || "",
      name_uz: uz || "",
      name_ru: ru || "",
      name_en: en || "",
    }) ||
    fallback ||
    "";

  if (!teacherId)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100] text-red-500">
        {t.teacherDetail.invalidId || "Teacher ID topilmadi"}
      </div>
    );

  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100] text-gray-700 dark:text-gray-300">
        {t.teacherDetail.loading || "Yuklanmoqda..."}
      </div>
    );

  if (isError || !teacher)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100] text-red-500">
        {t.teacherDetail.error || "Xatolik yuz berdi"}
      </div>
    );

  return (
    <div>
      <section
        className={`min-h-screen py-20 px-4 ${
          isDark
            ? "bg-gradient-to-b from-gray-900 to-black"
            : "bg-gradient-to-b from-gray-50 to-gray-100"
        }`}
      >
        <div className="max-w-6xl mx-auto flex max-sm:flex-col gap-6">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            src={teacher.photo}
            alt={loc(
              teacher.full_name_uz,
              teacher.full_name_ru,
              teacher.full_name_en,
              teacher.full_name
            )}
            className="w-[280px] h-[300px] rounded-2xl object-cover"
          />
          <div className="space-y-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-200">
              {loc(
                teacher.full_name_uz,
                teacher.full_name_ru,
                teacher.full_name_en,
                teacher.full_name
              )}
            </p>
            <p className="text-xl text-gray-700 dark:text-red-700">
              {loc(
                teacher.profession_uz,
                teacher.profession_ru,
                teacher.profession_en,
                teacher.profession
              )}
            </p>
            <div className="flex flex-wrap gap-3 text-gray-600 dark:text-gray-400">
              <span className="border rounded-lg px-4 py-2 bg-white/10">
                {t.teacherDetail.experience}:{" "}
                <strong>
                  {teacher.experience ?? 0} {t.teacherDetail.year}
                </strong>
              </span>
              <span className="border rounded-lg px-4 py-2 bg-white/10">
                {t.teacherDetail.company}:{" "}
                <strong>{teacher.company || "—"}</strong>
              </span>
              <span className="border rounded-lg px-4 py-2 bg-white/10">
                {t.teacherDetail.students}:{" "}
                <strong>{teacher.total_students ?? 0}+</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="max-w-6xl mx-auto mt-8 space-y-6">
          <div
            className={`p-6 rounded-2xl border ${
              isDark
                ? "border-gray-800 bg-white/10"
                : "border-gray-400 bg-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Briefcase className="text-red-600" />{" "}
              <p className="text-lg dark:text-white/90">
                {t.teacherDetail.bio}
              </p>
            </div>
            <p className="mt-2 dark:text-white/70">
              {loc(teacher.bio_uz, teacher.bio_ru, teacher.bio_en, teacher.bio)}
            </p>
          </div>

          {/* Skills */}
          {teacher.skills?.length > 0 && (
            <div
              className={`p-6 rounded-2xl border ${
                isDark
                  ? "border-gray-800 bg-white/10"
                  : "border-gray-400 bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="text-red-600" />{" "}
                <p className="text-lg dark:text-white/90">
                  {t.teacherDetail.skills}
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {teacher.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-4 py-2 rounded-[10px] text-sm bg-gradient-to-br from-gray-300 to-gray-400 dark:from-[#3f000a] dark:to-[#18003f] dark:text-white/90"
                  >
                    {loc(
                      skill.name_uz || skill.name,
                      skill.name_ru || skill.name,
                      skill.name_en || skill.name,
                      skill.name || "—"
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {teacher.achievements?.length > 0 && (
            <div
              className={`p-6 rounded-2xl border ${
                isDark
                  ? "border-gray-800 bg-white/10"
                  : "border-gray-400 bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <Medal className="text-red-600" />{" "}
                <p className="text-lg dark:text-white/90">
                  {t.teacherDetail.achievements}
                </p>
              </div>
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2 mt-3">
                {teacher.achievements.map((achiev) => (
                  <span
                    key={achiev.id}
                    className="flex items-center gap-2 px-3 py-3 rounded-[10px] bg-gray-300 dark:bg-white/5 text-black dark:text-white text-sm"
                  >
                    <p className="h-2.5 w-2.5 rounded-full bg-green-500"></p>
                    {loc(
                      achiev.title_uz || achiev.title,
                      achiev.title_ru || achiev.title,
                      achiev.title_en || achiev.title,
                      achiev.title || "—"
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Contact />
    </div>
  );
}
