import path from "path";
import { Locale } from "./types";

const DEFAULT_CONFIG_PATH = "./next-i18next.config.js";

export type I18nConfig = {
  defaultLocale: Locale;
  locales: Locale[];
};

const config: {
  i18n: I18nConfig;
} = require(path.resolve(DEFAULT_CONFIG_PATH));

export const i18n = config.i18n;

export const locales = i18n.locales;
export const defaultLocale = i18n.defaultLocale;
