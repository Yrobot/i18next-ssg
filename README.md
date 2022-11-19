<p align="center">
  <a href="https://yrobot.top/" target="_blank" rel="noopener noreferrer">
    <img width="180" src="./i18next-ssg.svg" alt="logo">
  </a>
</p>
<br/>
<h2 align="center">
  <a href="https://yrobot.top/">i18next-ssg</a>
</h2>
<p align="center">
  The i18n tool for next.js ssg project.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/i18next-ssg"><img src="https://img.shields.io/npm/v/i18next-ssg.svg" alt="npm package"></a>
</p>
<br/>

## Demos

- [Next.js SSG]()

## How To Start

### 1. Install `i18next-ssg`

```
yarn add i18next-ssg next-i18next
```

### 2. Project Setup

First, create a `next-i18next.config.js` file in the root of your project. The syntax for the nested i18n object comes from Next.js directly.

`next-i18next.config.js`

```js
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
  },
};
```

### 3. Add locales json files to your Next.js project

```
- public
  - locales
    - zh
      - common.json
    - en
      - common.json
    - ... other languages
```

`public/locales/en/common.json`

```json
{
  "title": "English Title"
}
```

If you want to structure your translations/namespaces in a custom way, you will need to pass modified `localePath` and `localeStructure` values into `next-i18next.config.js`.

### 4. Wrap the app

`pages/_app.tsx`

add `appWithTranslation` logic

```tsx
import { appWithTranslation } from "i18next-ssg";

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(App);
```

### 5. Create `pages/[locale]` directory and Add pages under it

```
pages
  - [locale]
    - index.tsx
    - second.tsx
    - third.tsx
```

> `/second/index.tsx` and `/second.tsx` both work fine for `/second`

Add locale inject logic in every page, for example:  
`pages/[locale]/index.tsx`

```tsx
import { makeStaticProps, getStaticPaths } from "i18next-ssg/server";

export default Page(){
  return <div>Page</div>
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
```

### 6. use i18n inside the page

for example:

```tsx
import { useTranslation } from "i18next-ssg";

export default function Title() {
  const { t } = useTranslation("common");
  return <div>{t("title")}</div>;
}
```

### 7. Add root redirect logic [optional]

First, create `[[...paths]].tsx` under the `pages` folder (i18next-ssg will auto generate the root pages based on the pages you created under `[locale]`)

`pages/[[...paths]].tsx`

> copy pause the code directly, it will works fine for your project.

```tsx
export { getStaticProps, getStaticPaths } from "i18next-ssg/Redirect";
import { useRootPathRedirect } from "i18next-ssg";

export default function Page() {
  useRootPathRedirect();
  return <div>Redirecting...</div>;
}
```

Then, the auto redirect logic works lick this:

- / => /[locale]
- /second => /[locale]/second
- /third => /[locale]/third

The `[locale]` value based on `getLocale`, which strategy works follow this:

`[url locale]` > `[user set locale in localStorage]` > `[locale detect from browser navigator]`

---

After all these steps and run `yarn build` (`next build && next export -o build`), you will get output files below:

```
- build
  - locales
    - ... your locale json files
  - index.html
  - second.html
  - third.html
  - zh.html
  - en.html
  - en
    - second.html
    - third.html
  - zh
    - second.html
    - third.html
```

## Other Tricks

### All functions exported from `next-i18next` or `react-i18next`

```tsx
import {
  appWithTranslation,
  serverSideTranslations,
  i18n,
  withTranslation,
  I18nContext,
  Trans,
  Translation,
  useTranslation,
} from "i18next-ssg";
```

### locale route logic

#### `I18NLink`

```tsx
import { I18NLink } from "i18next-ssg";
export default function Pages() {
  return <I18NLink href="/sansa">Sansa</I18NLink>; // /sansa => /[locale]/sansa
}
```

#### `localize`

```tsx
import { useRouter } from "next/router";
import { localize } from "i18next-ssg";
export default function Pages() {
  const router = useRouter();
  return (
    <span
      onClick={() => {
        router.push(localize("/sansa")); // /sansa => /[locale]/sansa
      }}
    >
      Sansa
    </span>
  );
}
```

### locale switch logic

```tsx
import Link from "next/link";
import { useLocaleSwitcher, setUserLocale } from "i18next-ssg";

const localeMap: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

function LocaleSwitcher() {
  const {
    label, // current locale label
    options, // the option list of other locales
  } = useLocaleSwitcher({ localeMap });
  return (
    <div>
      <label>{label}</label>
      <ul>
        {options.map(({ label, path, locale }) => (
          <li key={path}>
            <Link href={path}>
              <span
                onClick={() => {
                  setUserLocale(locale);
                }}
              >
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocaleSwitcher;
```