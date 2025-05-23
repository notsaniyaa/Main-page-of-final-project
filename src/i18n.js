
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "User Profile": "User Profile",
          "Edit Profile": "Edit Profile",
          "Save Changes": "Save Changes",
          "Name": "Name",
          "Email": "Email",
          "Language": "Language",
          "Theme": "Theme"
        }
      },
      ru: {
        translation: {
          "User Profile": "Профиль пользователя",
          "Edit Profile": "Редактировать профиль",
          "Save Changes": "Сохранить изменения",
          "Name": "Имя",
          "Email": "Почта",
          "Language": "Язык",
          "Theme": "Тема"
        }
      },
      en: {
        translation: {
            "About Us": "About Us",
"Welcome to Ice Cream Shop! We offer the most delicious and natural ice cream made from high-quality ingredients. Our goal is to bring joy with every scoop!":
  "Welcome to Ice Cream Shop! We offer the most delicious and natural ice cream made from high-quality ingredients. Our goal is to bring joy with every scoop!",
"Whether you love classic flavors like vanilla and chocolate, or want to try unique options like mango and pistachio, we have something for everyone.":
  "Whether you love classic flavors like vanilla and chocolate, or want to try unique options like mango and pistachio, we have something for everyone.",
"Ice Cream Shop": "Ice Cream Shop",
        }
      },
      ru: {
        translation: {
            "About Us": "О нас",
"Welcome to Ice Cream Shop! We offer the most delicious and natural ice cream made from high-quality ingredients. Our goal is to bring joy with every scoop!":
  "Добро пожаловать в Ice Cream Shop! Мы предлагаем самое вкусное и натуральное мороженое из качественных ингредиентов. Наша цель — дарить радость с каждой ложкой!",
"Whether you love classic flavors like vanilla and chocolate, or want to try unique options like mango and pistachio, we have something for everyone.":
  "Любите классические вкусы, такие как ваниль и шоколад, или хотите попробовать что-то необычное, например, манго или фисташки — у нас есть всё!",
"Ice Cream Shop": "Магазин мороженого",
        }}

    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
