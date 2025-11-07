import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTeacherDetail } from "../../api/hooks/useTeacherDetail";
import { motion } from "motion/react";
import {
  Linkedin,
  Github,
  Twitter,
  Briefcase,
  BookOpen,
  Medal,
} from "lucide-react";
import { Contact } from "./Contact";

interface Skill {
  id: number;
  name_uz: string;
  name_en: string;
  name_ru: string;
}

interface Achievement {
  id: number;
  title_uz: string;
  title_en: string;
  title_ru: string;
}

// interface Teacher {
//   id: number;
//   full_name: string;
//   profession: string;
//   photo: string;
//   experience: number;
//   company: string;
//   total_students: number;
//   total_projects: number;
//   linkedin_link?: string;
//   github_link?: string;
//   twitter_link?: string;
//   bio_uz: string;
//   skills: Skill[];
//   achievements: Achievement[];
// }

// ----- COMPONENT -----
const TeacherDetail: React.FC = () => {
  const { id } = useParams();
  const teacherId = Number(id);

  const { data: teacher, isLoading, isError } = useTeacherDetail(teacherId);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const root = window.document.documentElement;
    if (savedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    document.title = "Teacher Detail";
  }, []);

  if (!teacherId) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <span className="text-red-500 text-lg">Teacher ID topilmadi</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <span className="text-gray-700 dark:text-gray-300 text-lg">
          Yuklanmoqda...
        </span>
      </div>
    );
  }

  if (isError || !teacher) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <span className="text-red-500 text-lg">Xatolik yuz berdi</span>
      </div>
    );
  }

  return (
    <div>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black py-20">
        <div className="max-w-6xl mx-auto px-4 mt-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex max-sm:flex-col border-gray-200/30 dark:border-gray-700"
          >
            {/* Image */}
            <div className="relative min-w-[250px] w-[280px] h-[300px] rounded-2xl overflow-hidden">
              <img
                src={teacher.photo}
                alt={teacher.full_name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 space-y-4">
              <p className="text-[30px] text-gray-900 dark:text-gray-200">
                {teacher.full_name}
              </p>
              <p className="text-gray-700 dark:text-red-700 text-[25px]">
                {teacher.profession}
              </p>

              <div className="flex flex-wrap gap-3 items-center text-gray-600 dark:text-gray-400">
                <span className="border rounded-lg px-4 py-2 bg-white/10">
                  Tajriba: <br />
                  <strong className="dark:text-white/90">
                    {teacher.experience} yil
                  </strong>
                </span>
                <span className="border rounded-lg px-4 py-2 bg-white/10">
                  Kompaniya: <br />{" "}
                  <strong className="dark:text-white/90">
                    {teacher.company}
                  </strong>
                </span>
                <span className="border rounded-lg px-4 py-2 bg-white/10">
                  O'quvchilar: <br />{" "}
                  <strong className="dark:text-white/90">
                    {teacher.total_students}+
                  </strong>
                </span>
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-6">
                {teacher.linkedin_link && (
                  <a
                    href={teacher.linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-[10px] transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {teacher.github_link && (
                  <a
                    href={teacher.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-900 text-white rounded-[10px] transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {teacher.twitter_link && (
                  <a
                    href={teacher.twitter_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-blue-400 hover:bg-blue-500 text-white rounded-[10px] transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Biografiya */}
        <div className="max-w-6xl mx-auto px-4 mt-5">
          <div className="border dark:border-gray-800 border-gray-400 p-6 rounded-2xl bg-white/10">
            <div className="flex gap-2">
              <Briefcase className="text-red-600" />
              <p className="dark:text-white/90 text-[18px]">Biografiya</p>
            </div>
            <p className="dark:text-white/70 text-[16px] mt-2">
              {teacher.bio_uz}
            </p>
          </div>
        </div>

        {/* Ko'nikmalar */}
        <div className="max-w-6xl mx-auto px-4 mt-5">
          <div className="border dark:border-gray-800 border-gray-400 p-6 rounded-2xl bg-white/10">
            <div className="flex gap-2">
              <BookOpen className="text-red-600" />
              <p className="dark:text-white/90 text-[18px]">Ko'nikmalar</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {teacher.skills.map((skill: Skill) => (
                <span
                  key={skill.id}
                  className="px-4 py-2 text-gray-900 dark:text-white/90 rounded-[10px] bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-200 dark:from-[#3f000a] dark:to-[#18003f] dark:border-red-900 text-sm"
                >
                  {skill.name_uz}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Yutuqlar */}
        <div className="max-w-6xl mx-auto px-4 mt-5">
          <div className="border dark:border-gray-800 border-gray-400 p-6 rounded-2xl bg-white/10">
            <div className="flex gap-2">
              <Medal className="text-red-600" />
              <p className="dark:text-white/90 text-[18px]">Yutuqlar</p>
            </div>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2 mt-3">
              {teacher.achievements.map((achiev: Achievement) => (
                <span
                  key={achiev.id}
                  className="flex items-center gap-3 px-3 py-3 rounded-[10px] bg-gray-300 dark:bg-white/5 text-black dark:text-white text-sm"
                >
                  <p className="h-2.5 w-2.5 rounded-full bg-green-500"></p>
                  {achiev.title_uz}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-6xl flex mx-auto mt-6 px-4 gap-3 justify-between">
          <div
            className="w-[50%] h-[170px] rounded-2xl flex flex-col justify-center items-center
             bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-200
             dark:from-[#3f000a] dark:to-[#18003f] dark:border-red-950"
          >
            <strong className="text-[20px] text-gray-900 dark:text-white/90">
              {teacher.total_projects}+
            </strong>
            <p className="text-gray-800 dark:text-white/50">Loyihalar</p>
          </div>

          <div className="w-[50%] h-[170px] rounded-2xl flex flex-col justify-center items-center bg-gradient-to-br from-green-200 to-green-300 border border-green-200 dark:from-green-900 dark:to-green-950 dark:border-green-700">
            <strong className="text-[20px] text-gray-900 dark:text-white/90">
              {teacher.total_students}+
            </strong>
            <p className="text-gray-600 dark:text-white/50">O'quvchilar</p>
          </div>
        </div>
      </section>
      <Contact />
    </div>
  );
};

export default TeacherDetail;
