import type { ReactNode } from "react";

/** A situation page is driven by an i18n namespace exposing `hero` and `blocks[]`. */
export interface SituationBlock {
  type?: string;
  sectionKey?: string;
  badge?: string;
  title?: string;
  lede?: string;
  intro?: string;
  columnsLabel?: string;
  background?: "rome";
  items?: unknown[];
  groups?: { badge?: string; items?: unknown[] }[];
  table?: {
    headers?: Record<string, string>;
    rows?: Record<string, ReactNode>[];
  };
  columnKeys?: string[];
  panels?: { heading?: string; title?: string; lede?: string; items?: string[] }[];
}

export interface SituationHeroData {
  buy?: { legend?: string; prefix?: string; label?: string };
  title?: string;
  badge?: string;
  quote?: string;
  lede?: string;
}

export interface SituationBlockGroup {
  badge?: string;
  items?: unknown[];
}
