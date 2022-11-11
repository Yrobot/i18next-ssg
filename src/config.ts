export type I18nConfig = {
  defaultLocale: Locale;
  locales: Locale[];
};

let config: {
  i18n: I18nConfig;
} = {
  i18n: {
    locales: [],
    defaultLocale: "en",
  },
};

try {
  config = require("next-i18next.config.js");
} catch (error) {
  throw new Error(`You have to define the 'i18n' in 'next-i18next.config.js'`);
}

export const locales = config.i18n.locales;
export const defaultLocale = config.i18n.defaultLocale;
