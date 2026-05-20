import RoutingQuiz from "../../../components/RoutingQuiz";
import { SITUATIONS } from "../../../commons/situationsManifest";
import {
  SITUATIONS_QUIZ_ROOT_STEP_ID,
  SITUATIONS_QUIZ_STEPS,
  getSituationsQuizTotalQuestions,
} from "../../../commons/situationsQuiz";

const situationTitleKey = (slug) => `situations.${slug}.title`;

/**
 * Situations hub quiz: thin wrapper around {@link RoutingQuiz}.
 * Requires i18n: `situations-index` (keys under `quiz.*` and `situations.*`).
 */
export default function SituationsQuiz() {
  return (
    <RoutingQuiz
      steps={SITUATIONS_QUIZ_STEPS}
      rootStepId={SITUATIONS_QUIZ_ROOT_STEP_ID}
      i18nNamespace="situations-index"
      uiKeyPrefix="quiz"
      totalQuestions={getSituationsQuizTotalQuestions()}
      resultHref={(slug) => `/situations/${slug}`}
      resultTitleKey={situationTitleKey}
      resultTeaserKey={(slug) => `situations.${slug}.teaser`}
      browseLinks={SITUATIONS.map((situation) => ({
        id: situation.slug,
        href: `/situations/${situation.slug}`,
      }))}
      browseLinkLabelKey={situationTitleKey}
    />
  );
}
