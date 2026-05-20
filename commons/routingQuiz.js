/**
 * Generic routing-quiz tree helpers (structure only; copy lives in i18n).
 * @typedef {{ id: string; next?: string; result?: string }} RoutingQuizOption
 * @typedef {{ questionKey: string; options: RoutingQuizOption[] }} RoutingQuizStep
 * @typedef {Record<string, RoutingQuizStep>} RoutingQuizSteps
 */

/**
 * @param {RoutingQuizSteps} steps
 * @param {string} stepId
 * @returns {RoutingQuizStep | undefined}
 */
export function getRoutingQuizStep(steps, stepId) {
  // eslint-disable-next-line security/detect-object-injection -- stepId from quiz state
  return steps[stepId];
}

/**
 * Longest path from a step to any terminal option (result), inclusive.
 * @param {RoutingQuizSteps} steps
 * @param {string} stepId
 * @param {number} [depth]
 * @returns {number}
 */
export function getRoutingQuizMaxDepth(steps, stepId, depth = 1) {
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

/**
 * @param {string[]} stepStack
 * @param {string} [rootStepId]
 * @returns {number}
 */
export function getRoutingQuizQuestionNumber(stepStack, rootStepId = "root") {
  if (!stepStack.length || stepStack[0] !== rootStepId) {
    return 1;
  }
  return stepStack.length;
}
