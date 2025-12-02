import { motion } from "motion/react";
import { Clock, Users, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useCourses } from "../../api/hooks/useCourses";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

type TechnologiesType = {
  id: number;
  name_uz: string;
  icon: string;
};

type CourseType = {
  id: number;
  technologies: TechnologiesType[];
  title_uz: string;
  description_uz: string;
  banner: string;
  duration: number;
  students: number;
};

export function Courses() {
  const { data, isLoading, isError } = useCourses();

  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <p className="text-[20px] font-semibold text-gray-700 dark:text-gray-300">
          Loading...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <p className="text-[20px] font-semibold text-red-500">
          Xatolik yuz berdi!
        </p>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <p className="text-[20px] font-semibold text-gray-700 dark:text-gray-300">
          Hozircha kurslar mavjud emas.
        </p>
      </div>
    );

  return (
    <section
      id="courses"
      className="pt-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-red-600/20 border border-red-600/30 px-6 py-3 rounded-full mb-6">
            <span className="text-red-500 font-medium">Bizning Kurslar</span>
          </div>

          <h2 className="text-black dark:text-white mb-6 text-4xl font-bold max-sm:text-3xl">
            O'z kelajak <span className="text-red-600"> kasbingizni</span>{" "}
            Tanlang!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Real loyihalar asosida sohani o'rganing va bozorda talabgir
            mutaxasisga aylaning!
          </p>
        </motion.div>
      </div>

      {/* 🔥 Swiper - to‘liq ekran kengligida */}
      <div className="relative w-screen left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={15000}
          slidesPerView={3}
          spaceBetween={32}
          grabCursor={true}
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 16 },
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 2.5, spaceBetween: 28 },
            1280: { slidesPerView: 3, spaceBetween: 32 },
          }}
          className="py-[30px]"
        >
          {data?.map((course: CourseType, idx: number) => (
            <SwiperSlide key={idx}>
              <motion.div
                onClick={() =>
                  window.open(
                    `/courses/${course.id}`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-[#3f0101] dark:to-black/50 shadow-lg dark:shadow-gray-800/40 border border-gray-200 dark:border-gray-700 min-w-[280px] min-h-[700px] rounded-2xl overflow-hidden transition-all cursor-pointer hover:shadow-xl hover:shadow-red-600/20"
              >
                {/* Image */}
                <div className="relative h-[250px] overflow-hidden">
                  <ImageWithFallback
                    src={course.banner}
                    alt={course.title_uz}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <Users className="w-4 h-4 text-red-500" />
                    <span className="text-white text-sm font-medium">
                      {course.students}+
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col h-full justify-between p-8">
                  <div className="h-[350px] max-sm:h-[400px]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gray-200/40 dark:bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                        <Clock className="w-4 h-4 text-red-500" />
                        <span className="text-gray-700 dark:text-white text-sm font-medium">
                          {course.duration} oy
                        </span>
                      </div>
                    </div>

                    <h3 className="text-black dark:text-white text-xl font-semibold mb-3 line-clamp-1">
                      {course.title_uz}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-2">
                      {course.description_uz}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course?.technologies?.map((tech) => (
                        <span
                          key={tech.id}
                          className="flex items-center gap-2 px-3 py-1.5 bg-white/70 dark:bg-gray-800/80 rounded-lg text-sm border border-gray-200 dark:border-gray-700"
                        >
                          <div className="w-[25px] h-[25px] rounded-[3px] overflow-hidden">
                            <img
                              src={tech.icon}
                              alt={tech.name_uz}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-gray-800 dark:text-gray-200">
                            {tech.name_uz}
                          </p>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end">
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-red-500 hover:text-red-400 flex items-center gap-2 group/btn"
                    >
                      Batafsil ma'lumot
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-xl shadow-red-600/30"
        >
          Bepul Maslahat Olish
        </motion.button>
      </motion.div>
    </section>
  );
}
