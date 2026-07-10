import type { ReactNode } from "react";

import Container from "../../../components/Layout/Container";
import { parseHtmlContent } from "../../../commons/parseHtmlContent";
import SectionIntro from "../../../components/SectionIntro";
import { homeIntroRowStyle } from "../../../commons/pageRowSpacing";
import { situationBlockClassName } from "../situationBlockClassName";
import type { SituationBlock } from "../situationTypes";

interface SituationSectionProps {
  block: SituationBlock;
  children?: ReactNode;
  introChildren?: ReactNode;
}

/** Situation page section shell: container + optional SectionIntro + body. */
export default function SituationSection({
  block,
  children,
  introChildren = null,
}: SituationSectionProps) {
  const showIntro = Boolean(block.badge || block.title || introChildren);

  return (
    <Container className={situationBlockClassName(block)} align="center" halign="center">
      {showIntro && (
        <SectionIntro
          badge={block.badge}
          title={block.title}
          lede={block.lede ? parseHtmlContent(block.lede) : null}
          rowStyle={homeIntroRowStyle}
        >
          {introChildren}
        </SectionIntro>
      )}
      {children}
    </Container>
  );
}
