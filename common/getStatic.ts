import { i18n } from "../i18next-ssg.config";

export const getI18nPaths = () =>
  i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export async function getI18nProps(ctx, ns = ["common"]) {
  const locale = ctx?.params?.locale;
  let props = { locale, ns };
  return props;
}

export function makeStaticProps(ns = []) {
  return async function getStaticProps(ctx) {
    return {
      props: await getI18nProps(ctx, ns),
    };
  };
}
