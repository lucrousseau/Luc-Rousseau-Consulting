import ZineLayout from "../../components/ZineLayout";
import { clearI18nServerCache } from "../../utils/i18n-dev-reload";

const FOLDER = "images/zines/02_prt_hun_ita";
const NAMESPACE = "zine-02-prt-hun-ita";
const VALID_EXT = [".jpeg", ".jpg", ".png"];

export default function Zine(props) {
  return <ZineLayout {...props} namespace={NAMESPACE} />;
}

export async function getServerSideProps({ locale }) {
  clearI18nServerCache();
  const { join } = await import("path");
  const { promises: fs } = await import("fs");
  const sizeOf = (await import("image-size")).default;
  const { serverSideTranslations } = await import("next-i18next/serverSideTranslations");

  const folderPath = join(process.cwd(), "public", FOLDER);
  const images = await Promise.all(
    (await fs.readdir(folderPath))
      .filter((f) => VALID_EXT.includes(f.toLowerCase().slice(-4)))
      .map(async (image) => {
        const dim = sizeOf(join(folderPath, image));
        return { src: `/${FOLDER}/${image}`, width: dim.width, height: dim.height };
      })
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "zines", NAMESPACE])),
      namespace: NAMESPACE,
      images,
    },
  };
}
