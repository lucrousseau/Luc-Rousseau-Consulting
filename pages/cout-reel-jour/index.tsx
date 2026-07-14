import { useEffect } from "react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { calculatorRoleToSlug, parseCalculatorRoleSlug } from "../../commons/costCalculatorPresets";
import { serverSideTranslations } from "../../commons/serverSideTranslations";
import { getDayRateComparisonPath, ROUTES } from "../../commons/siteRoutes";

/**
 * Canonical calculator lives at `/cout-reel-jour/{dev|pm}`.
 * This index keeps one page surface: redirect bare + legacy `?profil=` URLs to the slug.
 */
export default function CoutReelJourIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const fromQuery = parseCalculatorRoleSlug(
      typeof router.query.profil === "string" ? router.query.profil : undefined
    );
    const destination = fromQuery
      ? `${ROUTES.dayRateComparison}/${calculatorRoleToSlug(fromQuery)}`
      : getDayRateComparisonPath("productManager");

    void router.replace(destination);
  }, [router]);

  return null;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "fr", ["common"])),
    },
  };
};
