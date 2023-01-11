export default {};
declare global {
  type Locale = string;
  // type Locale = "en" | "zh";
}

export type I18nConfig = {
  defaultLocale?: Locale;
  locales?: Locale[];
};
