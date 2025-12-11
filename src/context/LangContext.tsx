import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import uz from "../locales/uz.json";
import ru from "../locales/ru.json";
import en from "../locales/en.json";

type Lang = "uz" | "ru" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: any;
  getText: (obj: any) => string;
}

const translations = { uz, ru, en };

const LangContext = createContext<LangContextType>({
  lang: "uz",
  setLang: () => {},
  t: translations.uz,
  getText: (obj) => obj,
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("uz");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Lang | null;
    if (storedLang) setLangState(storedLang);
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  const getText = (obj: any) => {
    if (!obj) return "";
    if (lang === "uz") return obj.title_uz || obj.name_uz || obj.description_uz || "";
    if (lang === "ru") return obj.title_ru || obj.name_ru || obj.description_ru || "";
    if (lang === "en") return obj.title_en || obj.name_en || obj.description_en || "";
    return "";
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang], getText }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
export const useLanguage = () => useContext(LangContext);
