import React from "react";

const getPathArr = (path) => path.split("/").filter((v) => !!v);

function Page({ locale }) {
  return <div className="app">Home: {locale}</div>;
}

Page.getInitialProps = async (ctx) => {
  const locale = getPathArr(ctx.asPath);
  return { locale };
};

export default Page;
