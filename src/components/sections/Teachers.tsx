// components/sections/Teachers.tsx
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useTeachers } from "../../api/hooks/useTeachers";
import { Github, Linkedin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

type Teacher = {
  id: number;
  full_name: string;
  profession: string;
  photo: string;
  experience: number;
  company: string;
  linkedin_link?: string;
  github_link?: string;
};

export function Teachers() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useTeachers();

  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-700 dark:text-gray-300 text-lg">
          Yuklanmoqda...
        </span>
      </div>
    );

  if (isError)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-red-500 text-lg">Xatolik yuz berdi</span>
      </div>
    );

  return (
    <section className="py-32 bg-gradient-to-b from-purple-50 dark:from-gray-900 to-gray-100 dark:to-black relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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
            <span className="text-red-500">Bizning Jamoamiz</span>
          </motion.div>
          <h2 className="text-black dark:text-white mb-6">
            Professional <span className="text-red-600">O‘qituvchilar</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dunyoning yirik kompaniyalarida ishlaganlar sizga o'rgatadi
          </p>
        </motion.div>

        {/* Swiper carousel */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={15000}
          slidesPerView="auto"
          spaceBetween={24}
          grabCursor
          className="!overflow-visible"
        >
          {data?.map((teacher: Teacher, index: number) => (
            <SwiperSlide
              key={teacher.id}
              style={{ width: "320px" }} // card eni o‘zgarmaydi
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/teachers/${teacher.id}`)}
                className="group bg-gradient-to-br from-gray-300 to-gray-500/5 dark:from-white/5 dark:to-white/10 backdrop-blur-sm border border-gray-400/40 dark:border-white/10 rounded-3xl overflow-hidden hover:border-red-600/30 transition-all cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={teacher.photo}
                    alt={teacher.full_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {teacher.linkedin_link && (
                      <motion.a
                        href={teacher.linkedin_link}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-white" />
                      </motion.a>
                    )}
                    {teacher.github_link && (
                      <motion.a
                        href={teacher.github_link}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className="p-6 bg-gray-100 dark:bg-gray-900">
                  <h3 className="dark:text-white mb-1">{teacher.full_name}</h3>
                  <p className="text-red-500 mb-2 text-sm">
                    {teacher.profession}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {teacher.experience}+ yil
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      @ {teacher.company}
                    </span>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
