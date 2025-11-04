import React from "react";
import { useParams } from "react-router-dom";
import { useTeacherDetail } from "../../api/hooks/useTeacherDetail";
import { motion } from "motion/react";
import { Linkedin, Github } from "lucide-react";

const TeacherDetail: React.FC = () => {
  const { id } = useParams();
  const teacherId = Number(id);

  const { data: teacher, isLoading, isError } = useTeacherDetail(teacherId);

  if (!teacherId) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-red-500 text-lg">Teacher ID topilmadi</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-700 dark:text-gray-300 text-lg">
          Yuklanmoqda...
        </span>
      </div>
    );
  }

  if (isError || !teacher) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-red-500 text-lg">Xatolik yuz berdi</span>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-xl overflow-hidden border border-gray-200/30 dark:border-gray-700"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={teacher.photo}
              alt={teacher.full_name}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {teacher.full_name}
                </h1>
                <p className="text-red-400 text-lg">{teacher.profession}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {teacher.description ||
                "Mentor haqida batafsil ma’lumot mavjud emas."}
            </p>

            <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
              <span>
                Tajriba: <strong>{teacher.experience} yil</strong>
              </span>
              <span>
                Kompaniya: <strong>{teacher.company}</strong>
              </span>
            </div>

            {/* Links */}
            <div className="flex gap-4 mt-6">
              {teacher.linkedin_link && (
                <a
                  href={teacher.linkedin_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all"
                >
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
              )}
              {teacher.github_link && (
                <a
                  href={teacher.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-full transition-all"
                >
                  <Github className="w-5 h-5" /> GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeacherDetail;
