/**
 * Shared JSDoc types for situation content blocks (no runtime exports).
 *
 * A situation page is driven by an i18n namespace exposing `hero` and `blocks[]`.
 * Each block is dispatched on `type`; most fields are optional and only present
 * for certain types. Collection item shapes vary by block type (cards, faq, stack,
 * highlights…), so `items` is intentionally `unknown[]` and cast at the consumer.
 *
 * @typedef {object} SituationBlock
 * @property {string} [type]
 * @property {string} [sectionKey]
 * @property {string} [badge]
 * @property {string} [title]
 * @property {string} [lede]
 * @property {string} [intro]
 * @property {string} [columnsLabel]
 * @property {"rome"} [background]
 * @property {unknown[]} [items]
 * @property {{ badge?: string; items?: unknown[] }[]} [groups]
 * @property {{ headers?: Record<string, string>; rows?: Record<string, import('react').ReactNode>[] }} [table]
 * @property {string[]} [columnKeys]
 * @property {{ heading?: string; title?: string; lede?: string; items?: string[] }[]} [panels]
 */

export {};
