import parse, { attributesToProps, domToReact, Element } from "html-react-parser";
import Link from "next/link";
import i18n from "i18next";

import { isExternalHref, resolveInternalLinkPath } from "./siteRoutes";

/**
 * @param {unknown} existing
 * @param {string} extra
 * @returns {string}
 */
function mergeClassName(existing, extra) {
  return [typeof existing === "string" ? existing : "", extra].filter(Boolean).join(" ");
}

/**
 * @param {object} [options]
 * @param {string} [options.locale]
 * @returns {string}
 */
function getActiveLocale(options) {
  return options?.locale ?? i18n.resolvedLanguage ?? i18n.language ?? "fr";
}

/**
 * @param {string | import('react').ReactNode | null | undefined} content
 * @param {{ locale?: string }} [options]
 * @returns {import('react').ReactNode | null}
 */
export function parseHtmlContent(content, options = {}) {
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
      const children = domToReact(
        /** @type {import("html-react-parser").DOMNode[]} */ (
          /** @type {unknown} */ (domNode.children)
        )
      );

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

/**
 * @param {{ title?: string; content?: string | import('react').ReactNode }[]} items
 * @param {{ locale?: string }} [options]
 * @returns {{ title?: string; content: import('react').ReactNode | null }[]}
 */
export function parseHtmlItems(items, options = {}) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item) => ({
    ...item,
    content: parseHtmlContent(item.content, options),
  }));
}
