import path from "path";
import { I18nConfig } from "./types";

const isServer = typeof window === "undefined";

const PATH = path.resolve("./next-i18next.config.js");

let i18n = process.env.NEXT_PUBLIC_I18N as I18nConfig;

if (isServer) i18n = require(PATH)?.i18n as I18nConfig;

if (i18n === undefined)
  throw new Error(
    `You have to add i18n config and export it as a next.js Environment Variable, visit https://github.com/Yrobot/i18next-ssg#2-project-setup for detail`
  );

export const locales = i18n?.locales ?? [];
export const defaultLocale = i18n?.defaultLocale ?? "";
