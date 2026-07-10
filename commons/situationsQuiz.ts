/**
 * Situations index quiz configuration. UI: {@link ../components/RoutingQuiz}.
 */

import {
  getRoutingQuizMaxDepth,
  getRoutingQuizQuestionNumber,
  getRoutingQuizStep,
  type RoutingQuizStep,
  type RoutingQuizSteps,
} from "./routingQuiz";

export const SITUATIONS_QUIZ_ROOT_STEP_ID = "root";

export const SITUATIONS_QUIZ_STEPS: RoutingQuizSteps = {
  root: {
    questionKey: "quiz.q1.question",
    options: [
      { id: "team", next: "team" },
      { id: "product", result: "product-manager-fractionnel" },
      { id: "live", next: "live" },
      { id: "launch", next: "launch" },
    ],
  },
  team: {
    questionKey: "quiz.q2.team.question",
    options: [
      { id: "first-hire", result: "premier-dev-fractionnel" },
      { id: "solo-dev", result: "dev-unique-backup" },
    ],
  },
  live: {
    questionKey: "quiz.q2.live.question",
    options: [
      { id: "rebuild", result: "refonte-produit-par-phases" },
      { id: "editorial", result: "plateforme-editoriale-produit" },
      { id: "ai-live", result: "ia-produit-garde-fous" },
    ],
  },
  launch: {
    questionKey: "quiz.q2.launch.question",
    options: [
      { id: "mvp", result: "mvp-saas-faisabilite" },
      { id: "ai-launch", result: "ia-produit-garde-fous" },
    ],
  },
};

export function getSituationsQuizStep(stepId: string): RoutingQuizStep | undefined {
  return getRoutingQuizStep(SITUATIONS_QUIZ_STEPS, stepId);
}

export function getSituationsQuizQuestionNumber(stepId: string): number {
  return getRoutingQuizQuestionNumber([stepId], SITUATIONS_QUIZ_ROOT_STEP_ID);
}

export function getSituationsQuizTotalQuestions(): number {
  return getRoutingQuizMaxDepth(SITUATIONS_QUIZ_STEPS, SITUATIONS_QUIZ_ROOT_STEP_ID);
}
