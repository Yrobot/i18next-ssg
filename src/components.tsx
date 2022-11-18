import React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

export function I18NLink({
  children,
  skipLocaleHandling,
  href,
  // handle list: /target
  // un handle list: undefined, /[locale]/target, http://yrobot.top
  locale,
  ...rest
}: React.PropsWithChildren<LinkProps> & {
  skipLocaleHandling?: boolean;
}) {
  const router = useRouter();

  locale = locale || `${router.query.locale}` || "";
  href = `${href || ""}`;

  if (
    !href ||
    !locale ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  )
    skipLocaleHandling = true;

  if (!skipLocaleHandling) href = `/${locale}${href}`;

  return (
    <Link {...rest} href={href}>
      {children}
    </Link>
  );
}
