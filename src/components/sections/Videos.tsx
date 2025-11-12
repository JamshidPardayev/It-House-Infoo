import { motion } from "motion/react";
import { Youtube } from "lucide-react";

const videoList = ["AeLA-3n3o_M", "QVnLiqDZYeE", "ECj-H1b1IrA", "Q6MVX_ytfpY"];

export function Videos() {
  return (
    <section
      id="videos"
      className="py-24 bg-white dark:bg-black transition-colors duration-300 overflow-hidden"
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
            className="inline-flex items-center gap-3 bg-red-600/20 border border-red-600/30 px-6 py-3 rounded-full mb-6"
          >
            <Youtube className="w-5 h-5 text-red-500" />
            <span className="text-red-500">Bepul Video Darslar</span>
          </motion.div>

          <h2 className="text-black dark:text-white text-3xl sm:text-4xl font-bold mb-4">
            YouTube Kanalimizda <span className="text-red-600">700+</span> Video
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            14K+ obunachilar • 700k+ ko'rishlar • Har kuni yangi darslar
          </p>

          <motion.a
            href="https://youtube.com/@ithouse"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-red-600 text-white px-10 py-4 rounded-xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/30"
          >
            <Youtube className="w-6 h-6" />
            YouTube Kanalga Obuna Bo'lish
          </motion.a>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videoList.map((videoId) => (
            <div
              key={videoId}
              className="relative overflow-hidden rounded-xl shadow-lg shadow-gray-300 dark:shadow-gray-800"
            >
              <iframe
                className="w-full h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72"
                src={`https://www.youtube.com/embed/${videoId}?si=lGrb_VPXAiSTEngs`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                style={{ borderRadius: "10px" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
