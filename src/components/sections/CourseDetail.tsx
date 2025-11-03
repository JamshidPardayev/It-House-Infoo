import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { Clock, Users } from "lucide-react";
import { useCourseDetail } from "../../api/hooks/useCourses";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// ✅ Type definitions
interface Technology {
  id: number;
  name_uz: string;
  name_en: string;
  name_ru: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

interface Course {
  id: number;
  title_uz: string;
  title_en: string;
  title_ru: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  banner: string;
  duration: number;
  price: string;
  students: number;
  technologies: Technology[];
  created_at: string;
  updated_at: string;
}

export default function CourseDetail() {
  const { id } = useParams();
  const courseId = Number(id);
  const { data, isLoading, isError } = useCourseDetail(courseId);
  console.log(data);

  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Yuklanmoqda...
        </p>
      </div>
    );

  if (isError || !data)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-lg font-semibold text-red-500">Xatolik yuz berdi!</p>
      </div>
    );

  const course: Course = data;

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden shadow-xl mb-12"
        >
          <ImageWithFallback
            src={course.banner}
            alt={course.title_uz}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-3">{course.title_uz}</h1>
            <div className="flex gap-4 items-center text-sm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500" /> {course.duration} oy
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-red-500" /> {course.students}{" "}
                talabalar
              </span>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Kurs haqida
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {course.description_uz}
          </p>
          <span className="flex items-center gap-3 mt-2 dark:text-white">
            <strong>Kurs narxi: </strong>
            <p className="text-[#ee2222] text-[22px] font-bold">
              {course.price} so'm
            </p>
          </span>
        </motion.div>

        {/* Technologies */}
        {course.technologies?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              O‘rganiladigan texnologiyalar
            </h2>
            <div className="flex flex-wrap gap-4">
              {course.technologies.map((tech) => (
                <div
                  key={tech.id}
                  className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                >
                  <div className="w-[30px] h-[30px] overflow-hidden rounded">
                    <img
                      src={tech.icon}
                      alt={tech.name_uz}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-gray-800 dark:text-gray-200">
                    {tech.name_uz}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
