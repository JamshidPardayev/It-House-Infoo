import React from "react";
import { useParams } from "react-router-dom";
import { useNewsDetail } from "../../api/hooks/useNews";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const newsId = id ? Number(id) : undefined;

  const { data: news, isLoading, isError } = useNewsDetail(newsId!);
  console.log(news);

  if (!newsId)
    return (
      <div className="p-10 text-center text-red-500">Yangilik ID topilmadi</div>
    );
  if (isLoading) return <div className="p-10 text-center">Yuklanmoqda...</div>;
  if (isError || !news)
    return (
      <div className="p-10 text-center text-red-500">Xatolik yuz berdi</div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-xl overflow-hidden border border-gray-200/30 dark:border-gray-700"
        >
          <img
            src={news.banner}
            alt={news.title_uz}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4 text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{news.created_at.split("T")[0]}</span>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {news.title_uz}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {news.description_uz}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsDetail;
