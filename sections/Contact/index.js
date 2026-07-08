import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import { homeIntroRowStyle, homeBodyRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";

/** @type {Record<string, string>} */
const CHANNEL_HREF_KEYS = {
  email: "common:contact-email-mailto",
  linkedin: "common:linkedin",
};

/** @param {string} variant */
function trackChannelClick(variant) {
  import("@vercel/analytics")
    .then(({ track }) => {
      if (typeof track === "function") {
        track("cta_click", { section: `contact:${variant}` });
      }
    })
    .catch(() => {});
}

/**
 * @param {{ id: string; actionLabel?: string }} channel
 * @param {import('i18next').TFunction} t
 * @returns {string | undefined}
 */
function getChannelLinkLabel(channel, t) {
  if (channel.id === "email") {
    return t("common:contact-email-display");
  }
  return channel.actionLabel;
}

/**
 * Site-wide contact section. Requires i18n: `contact`, `common`.
 * @param {import('../../commons/sectionTypes').SectionWithCtaProps & { introTeaser?: string | null }} [props]
 */
export default function Contact({ cta, introTeaser = null } = {}) {
  const { t } = useTranslation(["contact", "common"]);
  const scheduleCta = getScheduleCta(t);
  const channels =
    /** @type {{ id: string; title: string; hint?: string; actionLabel?: string }[]} */ (
      t("contact:channels", { returnObjects: true })
    );
  const channelList = Array.isArray(channels)
    ? channels.filter((channel) => channel?.id && CHANNEL_HREF_KEYS[channel.id])
    : [];
  const meta = t("contact:meta");
  const channelsAria = t("contact:channelsAria");
  const footnote = t("contact:footnote");
  const situationIntro = introTeaser?.trim() ? introTeaser : null;
  const lede = situationIntro
    ? parseHtmlContent(situationIntro)
    : parseHtmlContent(t("contact:lede"));
  const ctaTeaser = situationIntro ? null : parseHtmlContent(t("contact:ctaTeaser"));

  return (
    <Container id={t("contact:anchor")} className="section-contact" align="center" halign="center">
      <SectionIntro
        badge={t("contact:badge")}
        title={t("contact:title")}
        lede={lede}
        rowStyle={homeIntroRowStyle}
      />
      <Row
        halign="center"
        style={homeBodyRowStyle}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <div className="section-contact__panel">
                {meta ? <p className="section-contact__meta">{meta}</p> : null}

                <div className="section-contact__layout">
                  <div className="section-contact__primary">
                    <SectionCta
                      wrapRow={false}
                      bare
                      align="center"
                      showContactAlternates={false}
                      trackSection="contact"
                      href={cta?.link ?? scheduleCta.link}
                      label={cta?.label ?? scheduleCta.label}
                      teaser={ctaTeaser}
                      teaserClassName="big section-contact__cta-teaser"
                      className="section-contact__cta"
                    />
                  </div>

                  {channelList.length > 0 && (
                    <div className="section-contact__channels">
                      <ul className="section-contact__channel-list" aria-label={channelsAria}>
                        {channelList.map((channel) => {
                          const hrefKey = CHANNEL_HREF_KEYS[channel.id];
                          const href = t(hrefKey);
                          const linkLabel = getChannelLinkLabel(channel, t);

                          return (
                            <li key={channel.id} className="section-contact__channel">
                              <span className="section-contact__channel-title">
                                {channel.title}
                              </span>
                              {channel.hint ? (
                                <span className="section-contact__channel-hint">
                                  {channel.hint}
                                </span>
                              ) : null}
                              <a
                                className="section-contact__channel-link"
                                href={href}
                                {...(channel.id === "linkedin"
                                  ? { target: "_blank", rel: "noopener noreferrer" }
                                  : {})}
                                onClick={() => trackChannelClick(channel.id)}
                              >
                                {linkLabel}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                {footnote ? (
                  <div className="section-contact__footnote">{parseHtmlContent(footnote)}</div>
                ) : null}
              </div>
            ),
          },
        ]}
      />
    </Container>
  );
}
