import Image from "next/image";
import { useTranslation } from "next-i18next/pages";

import { parseHtmlContent } from "../../commons/parseHtmlContent";
import Container from "../../components/Layout/Container";
import Row from "../../components/Layout/Row";

/** Public path of the downloadable files (copied from `brand/` by `npm run brand`). */
export const MEDIA_KIT_BASE = "/media-kit";

export interface MediaKitFile {
  id: string;
  file: string;
  /** Size label, already formatted for the page locale. */
  size: string;
  dark?: boolean;
  noPreview?: boolean;
}

export interface MediaKitGroup {
  id: string;
  files: MediaKitFile[];
}

/** Brand palette from the approved charter (TK-397). No coral: it is not a brand colour. */
const PALETTE = [
  { id: "navy", hex: "#131E61", dark: true },
  { id: "slate", hex: "#454C73", dark: true },
  { id: "green", hex: "#4A6359", dark: true },
  { id: "chalk", hex: "#F6F5F5", dark: false },
  { id: "white", hex: "#FFFFFF", dark: false },
] as const;

const formatOf = (file: string) => file.split(".").pop()?.toUpperCase() ?? "";

/**
 * Media kit: the symbol, the palette and the downloadable files.
 * Requires i18n: `media-kit`. Noindex page, kept out of the sitemap and the navigation.
 */
export default function MediaKit({ groups }: { groups: MediaKitGroup[] }) {
  const { t } = useTranslation("media-kit");
  const rules = t("rules", { returnObjects: true }) as string[];

  return (
    <>
      <Container tag="section" className="media-kit__intro">
        <Row
          columns={[
            {
              cols: { col: 5, md: 12 },
              content: (
                <>
                  <p className="media-kit__eyebrow">{t("eyebrow")}</p>
                  <h1>{t("title")}</h1>
                </>
              ),
            },
            {
              cols: { col: 7, md: 12 },
              content: <p className="big media-kit__lede">{t("lede")}</p>,
            },
          ]}
        />
      </Container>

      <Container tag="section" className="media-kit__symbol">
        <Row
          valign="bottom"
          columns={[
            {
              cols: { col: 7, md: 12 },
              content: (
                <div className="media-kit__stage">
                  <Image
                    src={`${MEDIA_KIT_BASE}/lrc-symbole.svg`}
                    alt={t("symbol-alt")}
                    width={64}
                    height={64}
                    unoptimized
                  />
                </div>
              ),
            },
            {
              cols: { col: 5, md: 12 },
              content: (
                <>
                  <h2>{t("symbol-heading")}</h2>
                  <p>{t("symbol-meaning")}</p>
                  <ul className="media-kit__rules">
                    {rules.map((rule) => (
                      <li key={rule}>{parseHtmlContent(rule)}</li>
                    ))}
                  </ul>
                </>
              ),
            },
          ]}
        />
      </Container>

      <Container tag="section" className="media-kit__palette">
        <h2>{t("palette-heading")}</h2>
        <ul className="media-kit__swatches">
          {PALETTE.map(({ id, hex, dark }) => (
            <li
              key={id}
              className={dark ? "media-kit__swatch media-kit__swatch--dark" : "media-kit__swatch"}
              style={{ backgroundColor: hex }}
            >
              <span className="media-kit__swatch-name">{t(`colors.${id}`)}</span>
              <code>{hex}</code>
            </li>
          ))}
        </ul>
        <p className="small">{t("typography")}</p>
      </Container>

      <Container tag="section" className="media-kit__files">
        <h2>{t("files-heading")}</h2>
        <table className="media-kit__table">
          <thead>
            <tr>
              <td />
              <th scope="col">{t("col-file")}</th>
              <th scope="col" className="media-kit__optional">
                {t("col-usage")}
              </th>
              <th scope="col" className="media-kit__optional">
                {t("col-format")}
              </th>
              <th scope="col">
                <span className="media-kit__sr">{t("download")}</span>
              </th>
            </tr>
          </thead>
          {groups.map((group) => (
            <tbody key={group.id}>
              <tr className="media-kit__group">
                <th scope="rowgroup" colSpan={5}>
                  {t(`groups.${group.id}`)}
                </th>
              </tr>
              {group.files.map((item) => {
                const label = t(`files.${item.id}.label`);
                return (
                  <tr key={item.id}>
                    <td>
                      {item.noPreview ? null : (
                        <span
                          className={
                            item.dark
                              ? "media-kit__thumb media-kit__thumb--dark"
                              : "media-kit__thumb"
                          }
                        >
                          <Image
                            src={`${MEDIA_KIT_BASE}/${item.file}`}
                            alt=""
                            width={32}
                            height={32}
                            unoptimized
                          />
                        </span>
                      )}
                    </td>
                    <th scope="row" className="media-kit__file">
                      {label}
                    </th>
                    <td className="media-kit__optional">{t(`files.${item.id}.usage`)}</td>
                    <td className="media-kit__optional">
                      {formatOf(item.file)} · {item.size}
                    </td>
                    <td>
                      <a
                        href={`${MEDIA_KIT_BASE}/${item.file}`}
                        download
                        aria-label={t("download-label", { file: label })}
                      >
                        {t("download")}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ))}
        </table>
      </Container>
    </>
  );
}
