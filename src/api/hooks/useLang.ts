import { useEffect, useState } from "react";
import uz from "../../locales/uz.json";
import en from "../../locales/en.json";
import ru from "../../locales/ru.json";

const translations = { uz, en, ru };

export function useLang() {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "uz");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  type LangType = "uz" | "ru" | "en";
  const t = translations[lang as LangType];

  // const t = translations[lang];

  const getText = (obj: any) => {
    if (!obj) return "";
    return (
      obj[`name_${lang}`] ||
      obj[`title_${lang}`] ||
      obj[`description_${lang}`] ||
      obj[lang] ||
      ""
    );
  };
  

  return { lang, setLang, t, getText };
}
