import * as React from "react";
import Head from "next/head";

import "./global.css";

// global page config
// NO need to change in normal develop
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>i18next-ssg</title>
        <meta
          name="description"
          content="a demo which shows the i18n solution for next.js SSG"
        ></meta>
        <meta name="keywords" content="i18n,ssg,demo,next.js"></meta>
        <meta name="author" content="http://yrobot.top"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
