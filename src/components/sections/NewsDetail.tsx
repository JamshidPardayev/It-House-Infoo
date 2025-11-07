import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNewsDetail } from "../../api/hooks/useNews";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { Contact } from "./Contact";

// interface Status {
//   id: number;
//   name_uz: string;
//   name_en: string;
//   name_ru: string;
//   created_at: string;
//   updated_at: string;
// }

// interface News {
//   id: number;
//   title_uz: string;
//   description_uz: string;
//   banner: string;
//   created_at: string;
//   status: Status | string;
// }

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const newsId = id ? Number(id) : undefined;

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
    document.title = "News Detail";
  }, []);

  const { data: news, isLoading, isError } = useNewsDetail(newsId!);
  console.log(news);

  if (!newsId)
    return (
      <div className="p-10 text-center text-red-500 z-[-100]">
        Yangilik ID topilmadi
      </div>
    );
  if (isLoading)
    return <div className="p-10 text-center z-[-100]">Yuklanmoqda...</div>;
  if (isError || !news)
    return (
      <div className="p-10 text-center text-red-500 z-[-100]">
        Xatolik yuz berdi
      </div>
    );

  const renderStatus = () => {
    if (!news.status) return "Start";
    // Agar status obyekt bo‘lsa, name_uz ni ko‘rsatamiz
    if (typeof news.status === "object") return news.status?.name_uz;
    return news.status;
  };

  // Agar description_uz obyekt bo‘lsa, stringga aylantirish
  const description =
    typeof news.description_uz === "string"
      ? news.description_uz
      : JSON.stringify(news.description_uz);

  return (
    <div>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-xl overflow-hidden border-gray-200/30 dark:border-gray-700"
          >
            <div className="px-8 pt-5 pb-2 border-b dark:border-b-gray-800 border-b-gray-300 mb-4">
              <div className="flex items-center gap-4">
                <span className="h-[35px] flex justify-center items-center bg-orange-600 text-white px-5 rounded-2xl">
                  {renderStatus()}
                </span>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{news.created_at.split("T")[0]}</span>
                </div>
              </div>
              <h1 className="text-3xl mt-3 font-semibold mb-4 text-gray-900 dark:text-white">
                {news.title_uz}
              </h1>
            </div>

            <div className="mx-8 h-64 rounded-2xl overflow-hidden">
              <img
                src={news.banner}
                alt={news.title_uz}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed pb-4 border-b dark:border-b-gray-800 border-b-gray-300">
                {description}
              </p>

              <div className="flex justify-between items-center mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Bu yangiliklarni ulashing</p>
                <button
                  onClick={async () => {
                    const shareData = {
                      title: news.title_uz,
                      text: description.slice(0, 100) + "...",
                      url: window.location.href,
                    };
                    if (navigator.share) {
                      try {
                        await navigator.share(shareData);
                        console.log("Yangilik muvaffaqiyatli ulashildi");
                      } catch (err) {
                        console.warn("Ulashish bekor qilindi yoki xato:", err);
                      }
                    } else if (navigator.clipboard) {
                      try {
                        await navigator.clipboard.writeText(
                          window.location.href
                        );
                        alert(
                          "🔗 Havola nusxalandi! Endi uni istalgan joyga joylashtiring."
                        );
                      } catch (err) {
                        console.error("Clipboard xatosi:", err);
                      }
                    } else {
                      const temp = document.createElement("textarea");
                      temp.value = window.location.href;
                      document.body.appendChild(temp);
                      temp.select();
                      document.execCommand("copy");
                      document.body.removeChild(temp);
                      alert("Havola nusxalandi!");
                    }
                  }}
                  className="bg-orange-700 h-[40px] w-[100px] text-white rounded-[10px] cursor-pointer hover:bg-orange-800 transition"
                >
                  Ulashish
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Contact />
    </div>
  );
};

export default NewsDetail;
