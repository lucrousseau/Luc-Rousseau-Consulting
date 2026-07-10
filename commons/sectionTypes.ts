import type { CSSProperties } from "react";

export interface SectionCtaOverride {
  link?: string;
  label?: string;
}

export interface SectionWithCtaProps {
  cta?: SectionCtaOverride;
  showCta?: boolean;
  introRowStyle?: CSSProperties;
  ctaRowStyle?: CSSProperties;
  className?: string;
}

export type SectionWithBackgroundProps = SectionWithCtaProps & {
  backgroundColor?: string;
};
