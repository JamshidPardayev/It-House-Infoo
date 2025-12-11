import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNewsDetail } from "../../api/hooks/useNews";
import { useStatus } from "../../api/hooks/useStatus";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { Contact } from "./Contact";
import { useLang } from "../../context/LangContext";

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const newsId = id ? Number(id) : undefined;
  const { data: news, isLoading, isError } = useNewsDetail(newsId!);
  const { data: statusData } = useStatus();
  const { getText, t } = useLang();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const root = window.document.documentElement;
    if (savedTheme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, []);

  useEffect(() => {
    if (news) document.title = getText(news);
  }, [news]);

  if (!newsId)
    return (
      <div className="p-10 text-center text-red-500 z-[-100]">
        {t.news.invalidId}
      </div>
    );
  if (isLoading)
    return <div className="p-10 text-center z-[-100]">{t.news.loading}</div>;
  if (isError || !news)
    return (
      <div className="p-10 text-center text-red-500 z-[-100]">
        {t.news.error}
      </div>
    );

  // 🔥 STATUSNI TO‘G‘RI ANIQLASH
  const renderStatus = () => {
    if (!statusData) return t.news.noStatus;

    if (typeof news.status === "object" && news.status !== null) {
      return getText(news.status);
    }

    if (typeof news.status === "number") {
      const found = statusData.find((s) => s.id === news.status);
      return found ? getText(found) : t.news.noStatus;
    }

    return t.news.noStatus;
  };

  // description
  const description = getText({
    description_uz: news.description_uz,
    description_ru: news.description_ru,
    description_en: news.description_en,
  });

  return (
    <div>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black pt-20">
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
                {getText(news)}
              </h1>
            </div>

            <div className="mx-8 h-64 rounded-2xl overflow-hidden">
              <img
                src={news.banner}
                alt={getText(news)}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed pb-4 border-b dark:border-b-gray-800 border-b-gray-300">
                {description}
              </p>

              <div className="flex justify-between items-center mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>{t.news.shareText}</p>

                <button
                  onClick={async () => {
                    const shareData = {
                      title: getText(news),
                      text: description.slice(0, 100) + "...",
                      url: window.location.href,
                    };

                    if (navigator.share) {
                      try {
                        await navigator.share(shareData);
                      } catch (err) {
                        console.warn("Share cancelled or error:", err);
                      }
                    } else if (navigator.clipboard) {
                      try {
                        await navigator.clipboard.writeText(
                          window.location.href
                        );
                        alert("🔗 " + t.news.linkCopied);
                      } catch (err) {
                        console.error("Clipboard error:", err);
                      }
                    } else {
                      const temp = document.createElement("textarea");
                      temp.value = window.location.href;
                      document.body.appendChild(temp);
                      temp.select();
                      document.execCommand("copy");
                      document.body.removeChild(temp);
                      alert("🔗 " + t.news.linkCopied);
                    }
                  }}
                  className="bg-orange-700 h-[40px] w-[100px] text-white rounded-[10px] cursor-pointer hover:bg-orange-800 transition"
                >
                  {t.news.shareBtn}
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
