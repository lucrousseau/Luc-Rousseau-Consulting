import parse from "html-react-parser";

/**
 * @param {string | import('react').ReactNode | null | undefined} content
 * @returns {import('react').ReactNode | null}
 */
export function parseHtmlContent(content) {
  if (!content) {
    return null;
  }
  if (typeof content === "string") {
    return parse(content);
  }
  return content;
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
