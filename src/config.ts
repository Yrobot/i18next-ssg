import { Locale } from "./types";

export type I18nConfig = {
  defaultLocale: Locale;
  locales: Locale[];
};

const config: {
  i18n: I18nConfig;
} = require("next-i18next.config.js");

if (config?.i18n === undefined)
  throw new Error(
    `You have to define the 'i18n' in '${"next-i18next.config.js"}'`
  );

export const locales = config.i18n.locales;
export const defaultLocale = config.i18n.defaultLocale;
