import parse, { attributesToProps, domToReact, Element, type DOMNode } from "html-react-parser";
import Link from "next/link";
import i18n from "i18next";
import type { ReactNode } from "react";

import { isExternalHref, resolveInternalLinkPath } from "./siteRoutes";

function mergeClassName(existing: unknown, extra: string): string {
  return [typeof existing === "string" ? existing : "", extra].filter(Boolean).join(" ");
}

interface ParseHtmlOptions {
  locale?: string;
}

function getActiveLocale(options?: ParseHtmlOptions): string {
  return options?.locale ?? i18n.resolvedLanguage ?? i18n.language ?? "fr";
}

export function parseHtmlContent(
  content: string | ReactNode | null | undefined,
  options: ParseHtmlOptions = {}
): ReactNode | null {
  if (!content) {
    return null;
  }
  if (typeof content !== "string") {
    return content;
  }

  const locale = getActiveLocale(options);

  return parse(content, {
    replace(domNode) {
      if (!(domNode instanceof Element) || domNode.name !== "a") {
        return undefined;
      }

      const href = domNode.attribs?.href;
      const props = attributesToProps(domNode.attribs);
      const className = mergeClassName(props.className, "text-link");
      const children = domToReact(domNode.children as DOMNode[]);

      if (isExternalHref(href)) {
        return (
          <a
            {...props}
            href={href}
            className={className}
            target={domNode.attribs.target ?? "_blank"}
            rel={domNode.attribs.rel ?? "noopener noreferrer"}
          >
            {children}
          </a>
        );
      }

      const internalPath = resolveInternalLinkPath(href, locale);
      if (internalPath) {
        const { href: _href, className: _className, ...linkProps } = props;
        return (
          <Link href={internalPath} className={className} {...linkProps}>
            {children}
          </Link>
        );
      }

      return (
        <a {...props} href={href} className={className}>
          {children}
        </a>
      );
    },
  });
}

interface HtmlItem {
  title?: string;
  content?: string | ReactNode;
}

export function parseHtmlItems(
  items: HtmlItem[],
  options: ParseHtmlOptions = {}
): { title?: string; content: ReactNode | null }[] {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item) => ({
    ...item,
    content: parseHtmlContent(item.content, options),
  }));
}
