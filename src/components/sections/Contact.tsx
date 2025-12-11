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
import { useLang } from "../../context/LangContext";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLang();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: t.menu?.contact,
      value: t.contact?.phone?.[0],
      value2: t.contact?.phone?.[1],
    },
    { icon: Mail, label: "Email", value: t.contact?.email },
    { icon: MapPin, label: "Address", value: t.contact?.address },
  ];

  const socialIcons = [Telegram, Instagram, Youtube];

  return (
    <section className="py-10 bg-gradient-to-b from-gray-50 dark:from-black to-white dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
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
            className="inline-block bg-blue-600/20 border border-blue-600/30 px-6 py-3 rounded-full mb-6"
          >
            <span className="text-blue-500">{t.menu?.contact}</span>
          </motion.div>
          <h2 className="text-black dark:text-white mb-6">{t.hero?.badge}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t.hero?.description}
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
                <input
                  type="text"
                  required
                  className="w-full bg-white/60 dark:bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-black/80 dark:text-white/80 placeholder-gray-500 focus:border-blue-300 dark:focus:border-gray-600 focus:outline-none transition-colors"
                  placeholder={t.hero?.students}
                />
                <input
                  type="tel"
                  required
                  pattern="^\+?\d*$"
                  className="w-full bg-white/60 dark:bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-black/80 dark:text-white/80 placeholder-gray-500 focus:border-blue-300 dark:focus:border-gray-600 focus:outline-none transition-colors"
                  placeholder="+998 90 123 45 67"
                  title="Only numbers and + allowed"
                />
                <select
                  required
                  className="w-full bg-white/60 dark:bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-black/80 dark:text-white/80 focus:border-blue-300 dark:focus:border-gray-600 focus:outline-none transition-colors"
                >
                  <option value="">{t.hero?.btn_courses}</option>
                  <option value="frontend">Frontend Development</option>
                  <option value="backend">Backend Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="design">UI/UX Design</option>
                </select>
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
                      {t.hero?.btn_consult}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.hero?.btn_courses}
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
            {contactInfo.map((item, index) => (
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
                  {item.value2 && (
                    <p className="dark:text-white">{item.value2}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social Media */}
            <div className="bg-gradient-to-br shadow-lg dark:shadow-none bg-gray-600/20 dark:from-white/5 dark:to-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-3xl p-8">
              <h3 className="dark:text-white mb-6">{t.menu?.videos}</h3>
              <div className="flex gap-4">
                {t.contact?.social?.map((social: any, index: number) => {
                  const Icon = socialIcons[index] || Instagram;
                  return (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl flex flex-col items-center gap-2 text-white hover:shadow-lg transition-all"
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs">{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
