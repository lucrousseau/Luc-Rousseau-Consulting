import parse, { attributesToProps, domToReact, Element } from "html-react-parser";

/**
 * @param {string} href
 * @returns {boolean}
 */
function isExternalHttpHref(href) {
  return typeof href === "string" && /^https?:\/\//i.test(href);
}

/**
 * @param {string | import('react').ReactNode | null | undefined} content
 * @returns {import('react').ReactNode | null}
 */
export function parseHtmlContent(content) {
  if (!content) {
    return null;
  }
  if (typeof content !== "string") {
    return content;
  }

  return parse(content, {
    replace(domNode) {
      if (!(domNode instanceof Element) || domNode.name !== "a") {
        return undefined;
      }

      const href = domNode.attribs?.href;
      if (!isExternalHttpHref(href)) {
        return undefined;
      }

      const props = attributesToProps(domNode.attribs);

      return (
        <a
          {...props}
          href={href}
          target={domNode.attribs.target ?? "_blank"}
          rel={domNode.attribs.rel ?? "noopener noreferrer"}
        >
          {domToReact(domNode.children)}
        </a>
      );
    },
  });
}

/**
 * @param {{ title?: string; content?: string | import('react').ReactNode }[]} items
 * @returns {{ title?: string; content: import('react').ReactNode | null }[]}
 */
export function parseHtmlItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item) => ({
    ...item,
    content: parseHtmlContent(item.content),
  }));
}
