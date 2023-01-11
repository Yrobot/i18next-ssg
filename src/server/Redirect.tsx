import { getPathsArr } from "../utilities";
import { readFilePaths } from "./index";

const LOCALE_PATH_PREFIX = "pages/[locale]";
const END_FIX = "/index";

const getPagePaths = async (): Promise<string[]> => {
  let paths: string[] = [];
  await readFilePaths(LOCALE_PATH_PREFIX, paths);
  paths = paths.map((p) => {
    const endIndex = p.lastIndexOf(".");
    // remove prefix and .ext
    let path = p.substring(
      LOCALE_PATH_PREFIX.length,
      endIndex === -1 ? Infinity : endIndex
    ); // ['/index','/demo/index','/demo/admin']

    // remove `/index`
    if (path.endsWith(END_FIX))
      path = path.substring(0, path.length - END_FIX.length);

    return path || "/";
  });
  return paths;
};

export async function getStaticPaths() {
  const paths = await getPagePaths();
  return {
    paths: paths.map((path) => ({
      params: {
        paths: getPathsArr(path),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
