import { useTranslation } from "next-i18next";
import Link from "next/link";

import Container from "../../components/Layout/Container";

/**
 * Private index of CV variants. Shareable for you only; never send to recruiters.
 */
export default function CvHub() {
  const { t } = useTranslation("cv-hub");
  const items = t("items", { returnObjects: true });

  return (
    <Container
      tag="article"
      className="cv-hub"
      style={{
        "--padding-top": "2rem",
        "--padding-bottom": "3rem",
      }}
    >
      <header className="cv-hub__header">
        <h1 className="cv-hub__title">{t("title")}</h1>
        <p className="cv-hub__lede big">{t("lede")}</p>
        <p className="cv-hub__note">{t("note")}</p>
      </header>

      <ul className="cv-hub__list">
        {Array.isArray(items) &&
          items.map((item) => (
            <li key={item.href} className="cv-hub__item">
              <Link href={item.href} className="cv-hub__link">
                <span className="cv-hub__role">{item.role}</span>
                <span className="cv-hub__when">{item.when}</span>
                <span className="cv-hub__path" aria-hidden="true">
                  {item.href}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </Container>
  );
}
