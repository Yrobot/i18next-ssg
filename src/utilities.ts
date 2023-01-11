import { locales, defaultLocale } from "./config";

const LOCAL_STORAGE_KEY = "__I18N_SET_LOCALE" as const;

export const getPathsArr = (path: string): string[] =>
  path.split("/").filter((v) => !!v);

export const getUrlLocale = (): Locale | null => {
  const locale = getPathsArr(window.location.pathname)[0];
  if (locales.includes(locale as Locale)) return locale as Locale;
  return null;
};

export const localize = (href: string): string => {
  const locale = getUrlLocale();
  if (locale) return `/${locale}${href}`;
  return href;
};

/**
 * @description get locale suggest based on the navigator.language
 * @doc Structure of navigator.language according to RFC 5646:
 * https://datatracker.ietf.org/doc/html/rfc5646#section-2
 * https://gist.github.com/msikma/8912e62ed866778ff8cd
 * @author Yrobot
 * @date 10/10/2022
 * @return {*}  {Locale|null}
 */
export const getDetectNavigator = (): Locale | null => {
  const language = window.navigator.language;
  if (!language) return null;
  const singleLanguage = language.split("-")[0].toLocaleLowerCase() as Locale;
  if (locales.includes(singleLanguage)) return singleLanguage;
  return null;
};

export const getUserSetLocale = (): Locale | null =>
  (localStorage.getItem(LOCAL_STORAGE_KEY) as Locale) || null;

export const setUserLocale = (locale: Locale) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, locale);
};

export const getLocale = (): Locale =>
  getUrlLocale() || getUserSetLocale() || getDetectNavigator() || defaultLocale;
