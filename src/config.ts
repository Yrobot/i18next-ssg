export type I18nConfig = {
  defaultLocale?: Locale;
  locales?: Locale[];
};

const i18n = process.env.i18n as I18nConfig;

if (i18n === undefined)
  throw new Error(
    `You have to export Environment Variables 'i18n' object in 'next.config.js'`
  );

export const locales = i18n?.locales ?? [];
export const defaultLocale = i18n?.defaultLocale ?? "";
