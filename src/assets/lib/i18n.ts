import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locale/en.json";
import ptBrTranslations from "../locale/pt.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations.translation },
      pt: { translation: ptBrTranslations.translation },
    },
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
