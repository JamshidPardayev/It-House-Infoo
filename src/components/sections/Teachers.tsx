// components/sections/Teachers.tsx
import { motion } from "motion/react";
import { useTeachers } from "../../api/hooks/useTeachers";
import { Github, Linkedin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
  const { data, isLoading, isError } = useTeachers();

  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <span className="text-gray-700 dark:text-gray-300 text-lg">
          Yuklanmoqda...
        </span>
      </div>
    );

  if (isError)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <span className="text-red-500 text-lg">Xatolik yuz berdi</span>
      </div>
    );

  return (
    <section
      id="teachers"
      className="py-10 bg-gradient-to-b from-purple-50 dark:from-gray-900 to-gray-100 dark:to-black relative overflow-hidden transition-colors duration-300"
    >
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
            Professional <span className="text-red-600">O'qituvchilar</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ko'p yillik tajribaga ega va ko'plab yirik loyihalar bilan ishlagan
            mutaxasislarimizdan ta'lim olasiz!
          </p>
        </motion.div>

        {/* Swiper Section */}
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
          className="!overflow-visible"
        >
          {data?.map((teacher: Teacher, index: number) => (
            <SwiperSlide key={teacher.id} style={{ width: 320 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() =>
                  window.open(
                    `/teachers/${teacher.id}`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="group bg-gradient-to-br from-gray-300 to-gray-500/5 dark:from-white/5 dark:to-white/10 backdrop-blur-sm border border-gray-400/40 dark:border-white/10 rounded-3xl overflow-hidden hover:border-red-600/30 transition-all cursor-pointer"
              >
                {/* Rasm qismi */}
                <div className="relative h-[350px] overflow-hidden">
                  <img
                    src={teacher.photo}
                    alt={teacher.full_name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-125 group-hover:shadow-[0_0_25px_8px_rgba(255,0,0,0.5)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>

                  {/* Ijtimoiy tarmoqlar */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

                {/* Matn qismi */}
                <div className="p-6 bg-gray-100 dark:bg-black/10">
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
