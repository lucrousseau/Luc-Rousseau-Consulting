import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import { homeIntroRowStyle, homeBodyRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";
import { trackCtaClick } from "../../utils/analytics";

import type { TFunction } from "i18next";
import type { SectionWithCtaProps } from "../../commons/sectionTypes";

const CHANNEL_HREF_KEYS = {
  email: "common:contact-email-mailto",
  linkedin: "common:linkedin",
} as const;

type ChannelId = keyof typeof CHANNEL_HREF_KEYS;

interface ContactChannel {
  id: ChannelId;
  title: string;
  hint?: string;
  actionLabel?: string;
}

function getChannelLinkLabel(channel: ContactChannel, t: TFunction): string | undefined {
  if (channel.id === "email") {
    return t("common:contact-email-display");
  }
  return channel.actionLabel;
}

type ContactProps = SectionWithCtaProps & {
  introTeaser?: string | null;
  /** Page id for analytics (situation / expertise), attached to contact CTAs. */
  trackPage?: string;
};

/**
 * Site-wide contact section. Requires i18n: `contact`, `common`.
 */
export default function Contact({ cta, introTeaser = null, trackPage }: ContactProps = {}) {
  const { t } = useTranslation(["contact", "common"]);
  const scheduleCta = getScheduleCta(t);
  const rawChannels = t("contact:channels", { returnObjects: true });
  const channels = (Array.isArray(rawChannels) ? rawChannels : []) as ContactChannel[];
  const channelList = channels.filter((channel) => channel?.id && channel.id in CHANNEL_HREF_KEYS);
  const meta = t("contact:meta");
  const channelsAria = t("contact:channelsAria");
  const footnote = t("contact:footnote");
  const situationIntro = introTeaser?.trim() ? introTeaser : null;
  const lede = situationIntro
    ? parseHtmlContent(situationIntro)
    : parseHtmlContent(t("contact:lede"));
  const ctaTeaser = situationIntro ? null : parseHtmlContent(t("contact:ctaTeaser"));
  const trackProps = trackPage ? { page: trackPage } : undefined;

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
                      trackProps={trackProps}
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
                                onClick={() => trackCtaClick(`contact:${channel.id}`, trackProps)}
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
