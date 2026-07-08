import { useTranslation } from "next-i18next";

import { parseHtmlContent } from "../../commons/parseHtmlContent";

import Container from "../../components/Layout/Container";
import Row from "../../components/Layout/Row";
import Picture from "../../components/Picture";
import Button from "../../components/Button";

import lucProfilPhoto from "../HomeHero/images/luc-profil-photo.jpg";

/**
 * Maps a CV variant to the i18n namespace holding its positioning copy
 * (role, tagline, summary, highlights, strengths, experience, skills).
 * Shared identity (name, contact, languages, awards, earlier
 * roles) always comes from the base `cv` namespace.
 */
const CV_POSITIONING_NS = new Map([
  ["engineer", "cv"],
  ["pm", "cv-pm"],
  ["dev", "cv-dev"],
  ["react", "cv-react"],
  ["techlead", "cv-techlead"],
  ["founding", "cv-founding"],
]);

/**
 * Standalone CV / resume page section (identity, profile, experience, skills…).
 * Meant to live on a noindex page.
 *
 * @param {object} props
 * @param {"engineer"|"pm"|"dev"|"react"|"techlead"|"founding"} [props.variant="engineer"] - Positioning angle.
 */
export default function Cv({ variant = "engineer" }) {
  const pos = CV_POSITIONING_NS.get(variant) ?? "cv";
  const { t } = useTranslation(["cv", pos, "common"]);

  // Positioning copy (variant-specific)
  const highlights = t(`${pos}:highlights.items`, { returnObjects: true });
  const strengths = t(`${pos}:strengths.items`, { returnObjects: true });
  const experience = t(`${pos}:experience.items`, { returnObjects: true });
  const skillGroups = t(`${pos}:skills.groups`, { returnObjects: true });

  // Shared identity copy (always from base `cv`)
  const contactItems = t("cv:contact.items", { returnObjects: true });
  const earlier = t("cv:earlier.items", { returnObjects: true });
  const languages = t("cv:languages.items", { returnObjects: true });
  const awards = t("cv:awards.items", { returnObjects: true });
  const educationContent = t("cv:education.content", { defaultValue: "" });
  const recommendationQuote = t("cv:recommendation.quote", { defaultValue: "" });
  const recommendationAuthor = t("cv:recommendation.author", { defaultValue: "" });
  const recommendationDetail = t("cv:recommendation.authorDetail", { defaultValue: "" });
  const showRecommendation = Boolean(recommendationQuote);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const main = (
    <div className="cv__main">
      <section className="cv__block" aria-labelledby="cv-summary">
        <h2 id="cv-summary" className="cv__heading underline">
          {t(`${pos}:summary.title`)}
        </h2>
        <div className="cv__prose big">{parseHtmlContent(t(`${pos}:summary.content`))}</div>
        <h3 className="cv__subheading">{t(`${pos}:strengths.title`)}</h3>
        <ul className="cv__strengths">
          {strengths.map((item, index) => (
            <li key={index} className="cv__strength">
              <h3 className="cv__strength-title">{item.title}</h3>
              <p className="cv__strength-text">{item.content}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="cv__block" aria-labelledby="cv-experience">
        <h2 id="cv-experience" className="cv__heading underline">
          {t(`${pos}:experience.title`)}
        </h2>
        <ol className="cv__timeline">
          {experience.map((entry, index) => (
            <li key={index} className="cv__entry">
              <div className="cv__entry-head">
                <h3 className="cv__entry-role">{entry.role}</h3>
                <p className="cv__entry-company">
                  {entry.companyHref ? (
                    <a
                      href={entry.companyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv__entry-company-link"
                    >
                      {entry.company}
                    </a>
                  ) : (
                    entry.company
                  )}
                </p>
                <p className="cv__entry-meta">
                  <span className="cv__entry-period">{entry.period}</span>
                  {entry.location ? (
                    <span className="cv__entry-location">{entry.location}</span>
                  ) : null}
                </p>
              </div>
              {entry.summary ? <p className="cv__entry-summary">{entry.summary}</p> : null}
              {entry.progression ? (
                <p className="cv__entry-progression">{entry.progression}</p>
              ) : null}
              {Array.isArray(entry.bullets) && entry.bullets.length > 0 ? (
                <ul className="cv__bullets">
                  {entry.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {entry.stack ? (
                <p className="cv__entry-stack">
                  <span className="cv__entry-stack-label">{t("cv:experience.stackLabel")}</span>{" "}
                  {entry.stack}
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="cv__earlier">
          <h3 className="cv__earlier-title">{t("cv:earlier.title")}</h3>
          <ul className="cv__earlier-list">
            {earlier.map((item, index) => (
              <li key={index} className="cv__earlier-item">
                <span className="cv__earlier-role">{item.role}</span>
                <span className="cv__earlier-company">{item.company}</span>
                <span className="cv__earlier-period">{item.period}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );

  const aside = (
    <div className="cv__aside">
      <section className="cv__card" aria-labelledby="cv-contact">
        <h2 id="cv-contact" className="cv__card-title">
          {t("cv:contact.title")}
        </h2>
        <ul className="cv__contact">
          {contactItems.map((item, index) => (
            <li key={index} className="cv__contact-item">
              <span className="cv__contact-label">{item.label}</span>
              <a
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="cv__contact-value"
              >
                {item.value}
              </a>
              {item.note ? <span className="cv__contact-note">{item.note}</span> : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="cv__card" aria-labelledby="cv-skills">
        <h2 id="cv-skills" className="cv__card-title">
          {t(`${pos}:skills.title`)}
        </h2>
        {skillGroups.map((group, index) => (
          <div key={index} className="cv__skill-group">
            <h3 className="cv__skill-group-title">{group.title}</h3>
            <ul className="cv__tags">
              {group.items.map((skill, skillIndex) => (
                <li key={skillIndex} className="cv__tag">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="cv__card" aria-labelledby="cv-languages">
        <h2 id="cv-languages" className="cv__card-title">
          {t("cv:languages.title")}
        </h2>
        <ul className="cv__languages">
          {languages.map((language, index) => (
            <li key={index} className="cv__language">
              <span className="cv__language-name">{language.name}</span>
              <span className="cv__language-level">{language.level}</span>
            </li>
          ))}
        </ul>
      </section>

      {educationContent ? (
        <section className="cv__card" aria-labelledby="cv-education">
          <h2 id="cv-education" className="cv__card-title">
            {t("cv:education.title")}
          </h2>
          <div className="cv__prose">{parseHtmlContent(educationContent)}</div>
        </section>
      ) : null}

      <section className="cv__card" aria-labelledby="cv-awards">
        <h2 id="cv-awards" className="cv__card-title">
          {t("cv:awards.title")}
        </h2>
        <ul className="cv__awards">
          {awards.map((award, index) => (
            <li key={index}>{award}</li>
          ))}
        </ul>
      </section>

      {showRecommendation ? (
        <section className="cv__card cv__card--quote" aria-labelledby="cv-recommendation">
          <h2 id="cv-recommendation" className="cv__card-title">
            {t("cv:recommendation.title")}
          </h2>
          <blockquote className="cv__quote">{recommendationQuote}</blockquote>
          <p className="cv__quote-author">
            {recommendationAuthor}
            {recommendationDetail ? (
              <>
                <br />
                <span className="cv__quote-author-detail">{recommendationDetail}</span>
              </>
            ) : null}
          </p>
        </section>
      ) : null}
    </div>
  );

  return (
    <Container id={t("cv:anchor")} className="section-cv" tag="article">
      <Row
        halign={"center"}
        columns={[
          {
            cols: { col: 11, xl: 12 },
            content: (
              <div className="cv">
                <header className="cv__identity">
                  <div className="cv__identity-photo">
                    <Picture
                      src={lucProfilPhoto}
                      width={280}
                      height={280}
                      alt={t("cv:photoAlt")}
                      rounded={true}
                      priority={true}
                      sizes={"(max-width: 600px) 40vw, 160px"}
                    />
                  </div>
                  <div className="cv__identity-text">
                    <p className="cv__role">{t(`${pos}:role`)}</p>
                    <h1 className="cv__name">{t("cv:name")}</h1>
                    <p className="cv__tagline">{t(`${pos}:tagline`)}</p>
                    <ul className="cv__identity-meta">
                      <li className="cv__identity-location">{t("cv:location")}</li>
                      <li className="cv__identity-availability">{t("cv:availability")}</li>
                    </ul>
                  </div>
                  <div className="cv__actions cv-print-hide">
                    <button type="button" className="btn btn--primary small" onClick={handlePrint}>
                      {t("cv:actions.print")}
                    </button>
                    <Button
                      variant={"secondary"}
                      size={"small"}
                      label={t("cv:actions.call")}
                      href={t("common:schedule-me")}
                      trackSection="cv"
                    />
                  </div>
                </header>

                <ul className="cv__highlights cv-print-hide" aria-hidden="true">
                  {highlights.map((item, index) => (
                    <li key={index} className="cv__highlight">
                      <span className="cv__highlight-value">{item.value}</span>
                      <span className="cv__highlight-label">{item.label}</span>
                    </li>
                  ))}
                </ul>

                <div className="cv__body">
                  {main}
                  {aside}
                </div>
              </div>
            ),
          },
        ]}
      />
    </Container>
  );
}
