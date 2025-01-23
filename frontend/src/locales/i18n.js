// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 引入翻译文件
import translationEN from "./en/translation.json";
import translationZH from "./zh/translation.json";

// 使用系统默认语言
const systemLang = navigator.language || navigator.userLanguage;
let defaultLang = "en";
if (systemLang.startsWith("zh")) {
  defaultLang = "zh";
}

// 配置 i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    zh: {
      translation: translationZH,
    },
  },
  lng: defaultLang, // 默认语言
  fallbackLng: "en", // 当所选语言的翻译不存在时，使用的语言
  interpolation: {
    escapeValue: false, // React 已经默认防止 XSS
  },
});

export default i18n;
