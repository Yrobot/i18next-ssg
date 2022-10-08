const { version } = require("./package.json");
const { i18n } = require("./i18next-ssg.config");
const { locales, defaultLocale } = i18n;

module.exports = {
  env: {
    NEXT_PUBLIC_VERSION: version,
    NEXT_PUBLIC_ENV: process.env.NODE_ENV,
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // console.log(defaultPathMap);
    // console.log({ locales, defaultLocale });

    const i18nextPathMap = { ...defaultPathMap };

    // handle the defaultLocale query for root path
    Object.entries(defaultPathMap).forEach(
      ([key, { query = {}, ...res } = {}]) => {
        i18nextPathMap[key] = {
          ...res,
          query: {
            ...query,
            // lan: defaultLocale,
          },
        };
      }
    );

    // handle the locale query for sub path
    locales.forEach((locale) => {
      Object.entries(defaultPathMap).forEach(
        ([key, { query = {}, ...res } = {}]) => {
          i18nextPathMap[`/${locale}${key === "/" ? "" : key}`] = {
            ...res,
            query: {
              ...query,
              // lan: locale,
            },
          };
        }
      );
    });

    console.log(i18nextPathMap);

    return i18nextPathMap;
  },
  trailingSlash: true,
  compress: false,
};
