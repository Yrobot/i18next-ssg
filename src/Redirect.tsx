import React from "react";
import { useRootPathRedirect } from "./router";
import { getPathsArr } from "./utilities";

export function Page() {
  useRootPathRedirect();
  return <div />;
}

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
