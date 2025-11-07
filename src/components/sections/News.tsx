import { motion } from "motion/react";
import { Calendar, ArrowRight } from "lucide-react";
import { useNews } from "../../api/hooks/useNews";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const News = () => {
  const { data, isLoading, isError } = useNews();
  console.log(data);

  if (isLoading)
    return (
      <div className="flex justify-center py-20 z-[-100]">Yuklanmoqda...</div>
    );
  if (isError)
    return (
      <div className="flex justify-center py-20 text-red-500 z-[-100]">
        Xatolik yuz berdi
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="flex justify-center py-20 text-gray-500 z-[-100]">
        Hozircha yangiliklar mavjud emas
      </div>
    );

  return (
    <section className="py-32 bg-gradient-to-b from-gray-100 dark:from-black to-white dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          So'nggi <span className="text-orange-600">Yangiliklar</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          IT_HOUSE markazi va o'quvchilar hayotidan eng so'nggi yangiliklardan
          xabardor bo'ling
        </p>
      </div>

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
      >
        {data.map((news) => (
          <SwiperSlide key={news.id} style={{ width: 400 }}>
            <motion.div
              className="bg-white dark:bg-white/10 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() =>
                window.open(`/news/${news.id}`, "_blank", "noopener,noreferrer")
              }
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={news.banner}
                  alt={news.title_uz}
                  className="w-full h-full object-cover hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>

                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm px-2 py-1 rounded">
                  <Calendar className="w-4 h-4" />
                  <span>{news.created_at.split("T")[0]}</span>
                </div>

                {/* ✅ STATUS OBYEKTINI TO'G'RI CHIQARISH */}
                <span className="absolute top-3 left-3 z-10 h-[32px] flex justify-center items-center bg-orange-600 text-white px-5 rounded-2xl">
                  {news.status?.name_uz || "No status"}
                </span>
              </div>

              {/* Content */}
              <div className="py-4 px-8 flex flex-col justify-between h-[200px]">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-1">
                    {news.title_uz}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 text-sm line-clamp-2">
                    {news.description_uz}
                  </p>
                </div>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="mt-4 text-orange-500 hover:text-orange-400 flex items-center gap-2"
                  onClick={() =>
                    window.open(
                      `/news/${news.id}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  Batafsil o'qish
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
