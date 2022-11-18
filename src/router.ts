import { useEffect } from "react";
import { useRouter } from "next/router";
import { getPathsArr, getUrlLocale, getLocale } from "./utilities";
import { locales, defaultLocale } from "./config";

export const useRootPathRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const locale = getLocale();
    const paths = getPathsArr(router.asPath);

    router.replace(`/${[locale, ...paths].join("/")}`);
  });
};

// Notice: this will auto remove the '/' on the end of the path
export const decodeI18nPath = (
  i18nPath: string
): {
  locale: Locale | null;
  pathname: string;
} => {
  const paths = getPathsArr(i18nPath);
  if (locales.includes(paths[0] as Locale))
    return {
      locale: paths[0] as Locale,
      pathname: `/${paths.slice(1).join("/")}`,
    };
  return {
    locale: null,
    pathname: `/${paths.join("/")}`,
  };
};

// add locale subpath if path is not i18n
export const encodeI18nPath = (
  path: string,
  locale = getUrlLocale()
): string => {
  if (path.startsWith("http")) return path; // http url
  const paths = getPathsArr(path);
  if (locales.includes(paths[0] as Locale)) return path; // is a i18n path
  if (locale === null) return path; // current url i18n is null
  return `/${[locale, ...paths].join("/")}`;
};

export const useI18nPath = () => {
  const router = useRouter();
  return decodeI18nPath(router.asPath);
};

export const useLocaleSwitcher = ({
  localeMap,
}: {
  localeMap: Record<Locale, string>;
}): {
  value: Locale;
  label: string;
  options: { label: string; path: string; locale: Locale }[];
} => {
  const { locale: urlLocale, pathname } = useI18nPath();
  const currentLocale = urlLocale || defaultLocale;
  return {
    value: currentLocale,
    label: localeMap[currentLocale],
    options: locales
      .filter((l) => l !== currentLocale)
      .map((locale) => ({
        label: localeMap[locale],
        locale,
        path: encodeI18nPath(pathname, locale),
      })),
  };
};
