import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { locales } from "./config";

export const getI18nPaths = () =>
  locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

type Context = Record<string, any>;

export async function getI18nProps(ctx: Context, ns = ["common"]) {
  const locale = ctx?.params?.locale;
  return serverSideTranslations(locale, ns);
}

export function makeStaticProps(ns = []) {
  return async function getStaticProps(ctx: Context) {
    return {
      props: await getI18nProps(ctx, ns),
    };
  };
}
