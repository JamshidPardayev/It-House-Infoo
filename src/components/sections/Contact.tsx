import { motion } from "motion/react";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Instagram,
  Youtube,
  Send as Telegram,
} from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      className="py-10 bg-gradient-to-b from-gray-50 dark:from-black to-white dark:to-gray-900 relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            className="inline-block bg-blue-600/20 border border-blue-600/30 px-6 py-3 rounded-full mb-6"
          >
            <span className="text-blue-500">Bog'lanish</span>
          </motion.div>

          <h2 className="text-black dark:text-white mb-6">
            Bugun <span className="text-blue-600">Boshlang</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Bepul konsultatsiya va kurs haqida to'liq ma'lumot oling
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br shadow-lg dark:shadow-none from-blue-100 to-red-100 dark:from-white/5 dark:to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
            >
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/60  dark:bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-black/80 dark:text-white/80 placeholder-gray-500 focus:border-blue-300 dark:focus:border-gray-600 focus:outline-none transition-colors"
                    placeholder="Ismingiz"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    pattern="^\+?\d*$"
                    className="w-full bg-white/60  dark:bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-black/80 dark:text-white/80 placeholder-gray-500 focus:border-blue-300 dark:focus:border-gray-600 focus:outline-none transition-colors"
                    placeholder="+998 90 123 45 67"
                    title="Faqat raqamlar va + belgisi ruxsat etiladi"
                  />
                </div>

                <div>
                  <select
                    required
                    className="w-full bg-white/60  dark:bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-black/80 dark:text-white/80 placeholder-gray-500 focus:border-blue-300 dark:focus:border-gray-600 focus:outline-none transition-colors"
                  >
                    <option value="">Kursni tanlang</option>
                    <option value="frontend">Frontend Development</option>
                    <option value="backend">Backend Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="design">UI/UX Design</option>
                  </select>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitted}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-blue-600/30 cursor-pointer"
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Yuborildi!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Yuborish
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Telefon", value: "+998 90 123 45 67" },
                { icon: Mail, label: "Email", value: "info@ithouse.uz" },
                {
                  icon: MapPin,
                  label: "Manzil",
                  value: "Toshkent sh., Chilonzor tumani",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-gray-600/20 shadow-lg dark:shadow-none dark:bg-white/5 backdrop-blur-sm border border-gray-400/70 dark:border-white/10 rounded-2xl p-6 hover:border-blue-600/30 transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.label}
                    </p>
                    <p className="dark:text-white">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br shadow-lg dark:shadow-none bg-gray-600/20 dark:from-white/5 dark:to-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-3xl p-8">
              <h3 className="dark:text-white mb-6">Ijtimoiy Tarmoqlar</h3>
              <div className="flex gap-4">
                {[
                  {
                    icon: Telegram,
                    name: "Telegram",
                    color: "from-blue-500 to-cyan-500",
                    link: "https://t.me/JamshidPardayev",
                  },
                  {
                    icon: Instagram,
                    name: "Instagram",
                    color: "from-pink-500 to-rose-500",
                    link: "https://www.instagram.com/ithouse_edu/",
                  },
                  {
                    icon: Youtube,
                    name: "YouTube",
                    color: "from-red-500 to-red-600",
                    link: "https://youtu.be/9bGpGeH8zrw?si=kZL_XjagoVZ5QG-r",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 bg-gradient-to-r ${social.color} p-4 rounded-xl flex flex-col items-center gap-2 text-white hover:shadow-lg transition-all`}
                  >
                    <social.icon className="w-6 h-6" />
                    <span className="text-xs">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
