/** Generic routing-quiz tree helpers (structure only; copy lives in i18n). */

export interface RoutingQuizOption {
  id: string;
  next?: string;
  result?: string;
}

export interface RoutingQuizStep {
  questionKey: string;
  options: RoutingQuizOption[];
}

export type RoutingQuizSteps = Record<string, RoutingQuizStep>;

export function getRoutingQuizStep(
  steps: RoutingQuizSteps,
  stepId: string
): RoutingQuizStep | undefined {
  // eslint-disable-next-line security/detect-object-injection -- stepId from quiz state
  return steps[stepId];
}

/** Longest path from a step to any terminal option (result), inclusive. */
export function getRoutingQuizMaxDepth(steps: RoutingQuizSteps, stepId: string, depth = 1): number {
  const step = getRoutingQuizStep(steps, stepId);
  if (!step) {
    return 0;
  }

  let maxDepth = depth;
  for (const option of step.options) {
    if (option.result) {
      maxDepth = Math.max(maxDepth, depth);
      continue;
    }
    if (option.next) {
      maxDepth = Math.max(maxDepth, getRoutingQuizMaxDepth(steps, option.next, depth + 1));
    }
  }

  return maxDepth;
}

export function getRoutingQuizQuestionNumber(stepStack: string[], rootStepId = "root"): number {
  if (!stepStack.length || stepStack[0] !== rootStepId) {
    return 1;
  }
  return stepStack.length;
}
