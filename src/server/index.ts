import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import fs from "fs/promises";
import path from "path";

import { getPathsArr } from "../utilities";
import { locales } from "../config";
export * from "../types";

export const readFilePaths = async (
  base: string = "",
  paths: string[] = []
) => {
  const files = await fs.readdir(base);
  await Promise.all(
    files.map(async (name) => {
      const current = path.join(base, name);
      const stat = await fs.stat(current);
      if (stat.isFile()) paths.push(current);
      if (stat.isDirectory()) await readFilePaths(current, paths);
    })
  );
};

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
