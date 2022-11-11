import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPathsArr } from "../utilities";
import { locales } from "../config";
export * from "../types";

const getI18nPaths = () =>
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

async function getI18nProps(ctx: Context, ns: string[] = ["common"]) {
  const locale = ctx?.params?.locale;
  return serverSideTranslations(locale, ns);
}

export const makeStaticProps = (ns: string[] = []) =>
  async function getStaticProps(ctx: Context) {
    return {
      props: await getI18nProps(ctx, ns),
    };
  };

export async function getStaticProps() {
  return {
    props: {},
  };
}

export const makeStaticPaths = (paths: string[]) =>
  async function getStaticPaths() {
    return {
      paths: paths.map((path) => ({
        params: {
          paths: getPathsArr(path),
        },
      })),
      fallback: false,
    };
  };
