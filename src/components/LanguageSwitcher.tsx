import { motion } from "motion/react";
import { useLang } from "../context/LangContext";

export const LanguageSwitcher = () => {
  const { lang, setLang } = useLang();
  const languages = ["uz", "en", "ru"];

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as "uz" | "ru" | "en")}
        className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/10 text-black dark:text-white"
      >
        {languages.map((l) => (
          <option key={l} value={l} className="text-black">
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </motion.div>
  );
};
