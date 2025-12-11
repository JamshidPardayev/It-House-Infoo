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

  const t = translations[lang];

  // APIdan kelgan ma'lumotlar uchun helper
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
