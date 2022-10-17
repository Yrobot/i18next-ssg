import path from "path";
import { UserConfig } from "next-i18next";
import { Locale } from "./types";

const DEFAULT_CONFIG_PATH = "./next-i18next.config.js";

const config: {
  i18n: UserConfig["i18n"];
} = require(DEFAULT_CONFIG_PATH);

export const i18n = config.i18n;

export const locales = i18n.locales as Locale[];
export const defaultLocale = i18n.defaultLocale as Locale;
