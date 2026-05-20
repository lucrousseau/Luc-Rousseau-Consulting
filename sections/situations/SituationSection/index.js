import parse from "html-react-parser";

import Container from "../../../components/Layout/Container";
import SectionIntro from "../../../components/SectionIntro";
import { homeIntroRowStyle } from "../../../commons/pageRowSpacing";
import { situationBlockClassName } from "../situationBlockClassName";

/**
 * Situation page section shell: container + optional SectionIntro + body.
 * @param {object} props
 * @param {object} props.block i18n block (badge, title, lede, type, sectionKey, …)
 * @param {import('react').ReactNode} [props.children]
 * @param {import('react').ReactNode} [props.introChildren] extra nodes inside SectionIntro
 */
export default function SituationSection({ block, children, introChildren = null }) {
  const showIntro = Boolean(block.badge || block.title || introChildren);

  return (
    <Container className={situationBlockClassName(block)} align="center" halign="center">
      {showIntro && (
        <SectionIntro
          badge={block.badge}
          title={block.title}
          lede={block.lede ? parse(block.lede) : null}
          rowStyle={homeIntroRowStyle}
        >
          {introChildren}
        </SectionIntro>
      )}
      {children}
    </Container>
  );
}
