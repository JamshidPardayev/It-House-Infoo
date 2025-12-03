import { motion } from "motion/react";
import { ArrowRight, Play, Star } from "lucide-react";
import { useStatistics } from "../../api/hooks/useStatistics";

export function Hero() {
  const { data, isLoading, isError } = useStatistics();

  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <p className="text-[20px] font-semibold text-gray-700">Loading...</p>
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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7f7f7] via-white to-[#ececec] dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-300"></div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-20 right-0 w-[600px] h-[600px] bg-red-600/10 dark:bg-red-600/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-red-600/30 px-6 py-3 rounded-full mb-8 backdrop-blur-sm">
            <Star className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="text-gray-900 dark:text-white">
              IT HOUSE - kelajak shu yerda
            </span>
            <Star className="w-5 h-5 text-red-500 fill-red-500" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-900 dark:text-white mb-8 leading-tight"
        >
          Zamonaviy
          <span className="bg-gradient-to-r from-red-600 via-red-500 to-purple-600 bg-clip-text text-transparent">
            {" "}
            kasblarni 0 dan{" "}
          </span>
          o'rgatamiz
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          IT HOUSE - barchasi amalga oshadigan maskan, yangi IT kasb ham, yangi
          kelajak ham
          <br />
          <span className="text-red-500">
            {data?.total_students}+ bitiruvchi
          </span>{" "}
          • <span className="text-green-500">10+ IT kasblar</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-5 rounded-xl hover:from-red-700 hover:to-red-800 transition-all flex items-center gap-3 group shadow-2xl shadow-red-600/50 text-lg cursor-pointer"
          >
            Bepul Konsultatsiya
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("courses")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gray-100 dark:bg-white/10 backdrop-blur-sm text-gray-900 dark:text-white px-12 py-5 rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-all border border-gray-300 dark:border-white/20 flex items-center gap-3 text-lg cursor-pointer"
          >
            <Play className="w-6 h-6" />
            Kurslarni Ko'rish
          </motion.button>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            {
              value: data?.total_students + "+",
              label: "O'quvchilar",
              color: "text-blue-500",
            },
            {
              value: data?.total_graduates + "+",
              label: "Bitiruvchilar",
              color: "text-green-500",
            },
            {
              value: data?.total_employed + "%",
              label: "Ishga joylashish",
              color: "text-purple-500",
            },
            {
              value: data?.avg_duration + " oy",
              label: "O'rtacha o'qish muddat",
              color: "text-red-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="bg-gradient-to-br from-gray-100 dark:from-white/5 to-gray-200 dark:to-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6 hover:border-red-600/30 transition-all cursor-pointer"
            >
              <div className={`${stat.color} text-3xl mb-2`}>{stat.value}</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
