import fs from "fs/promises";
import path from "path";

const readFilePaths = async (base: string = "", paths: string[] = []) => {
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

const checkPathExists = async (path: string): Promise<boolean> =>
  new Promise(async (resolve) =>
    fs
      .access(path)
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      })
  );

const END_FIX = "/index";

const getPagePaths = async (): Promise<string[]> => {
  const LOCALE_PATH_PREFIX = (await checkPathExists("pages"))
    ? "pages/[locale]"
    : "test/pages/[locale]";

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

getPagePaths().then(console.log);
