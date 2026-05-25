import RoutingQuiz from "../../../components/RoutingQuiz";
import { useRouter } from "next/router";
import { SITUATIONS } from "../../../commons/situationsManifest";
import { getSituationPathById, ROUTES } from "../../../commons/siteRoutes";
import {
  SITUATIONS_QUIZ_ROOT_STEP_ID,
  SITUATIONS_QUIZ_STEPS,
  getSituationsQuizTotalQuestions,
} from "../../../commons/situationsQuiz";

const situationTitleKey = (id) => `situations.${id}.title`;

/**
 * Situations hub quiz: thin wrapper around {@link RoutingQuiz}.
 * Requires i18n: `situations-index` (keys under `quiz.*` and `situations.*`).
 */
export default function SituationsQuiz({ className }) {
  const router = useRouter();
  const locale = router.locale ?? "fr";

  return (
    <RoutingQuiz
      className={className}
      steps={SITUATIONS_QUIZ_STEPS}
      rootStepId={SITUATIONS_QUIZ_ROOT_STEP_ID}
      i18nNamespace="situations-index"
      uiKeyPrefix="quiz"
      totalQuestions={getSituationsQuizTotalQuestions()}
      resultHref={(id) => getSituationPathById(id, locale) ?? `${ROUTES.situationsHub}/${id}`}
      resultTitleKey={situationTitleKey}
      resultTeaserKey={(id) => `situations.${id}.teaser`}
      browseLinks={SITUATIONS.map((situation) => ({
        id: situation.id,
        href: getSituationPathById(situation.id, locale),
      }))}
      browseLinkLabelKey={situationTitleKey}
    />
  );
}
