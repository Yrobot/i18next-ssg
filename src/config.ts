import { Locale } from "./types";

const CONFIG_PATH = "next-i18next.config.js";

export const get = () => {
  return require(CONFIG_PATH);
};

// export type I18nConfig = {
//   defaultLocale: Locale;
//   locales: Locale[];
// };

// const config: {
//   i18n: I18nConfig;
// } = require(path.resolve(CONFIG_PATH));

// if (config?.i18n === undefined)
//   throw new Error(`You have to define the 'i18n' in '${CONFIG_PATH}'`);

// export const locales = config.i18n.locales;
// export const defaultLocale = config.i18n.defaultLocale;
