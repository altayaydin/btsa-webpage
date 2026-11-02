import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "tr" | "en";
export type T = { tr: string; en: string };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (x: T) => string }>({
  lang: "tr",
  setLang: () => {},
  t: (x) => x.tr,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");
  // Storage can throw (blocked cookies, some private modes); the choice just isn't remembered then
  useEffect(() => {
    try {
      const s = localStorage.getItem("btsa-lang");
      if (s === "en" || s === "tr") setLangState(s);
    } catch {}
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("btsa-lang", l);
    } catch {}
    document.documentElement.lang = l;
  };
  return <Ctx.Provider value={{ lang, setLang, t: (x) => x[lang] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
