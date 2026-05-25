import { useId, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

import Button from "../Button";
import {
  getRoutingQuizMaxDepth,
  getRoutingQuizQuestionNumber,
  getRoutingQuizStep,
} from "../../commons/routingQuiz";

/**
 * Multi-step quiz that routes to a result (link + copy). Reusable across pages.
 *
 * @param {object} props
 * @param {import("../../commons/routingQuiz").RoutingQuizSteps} props.steps
 * @param {string} [props.rootStepId]
 * @param {string} props.i18nNamespace
 * @param {string} [props.uiKeyPrefix] - i18n prefix for chrome (`progress`, `back`, `result`, `browseAll`, `options`)
 * @param {number} [props.totalQuestions] - defaults to longest path in `steps`
 * @param {(resultId: string) => string} props.resultHref
 * @param {(resultId: string) => string} props.resultTitleKey
 * @param {(resultId: string) => string} [props.resultQuoteKey] - when set, shown instead of `resultTitleKey`
 * @param {(resultId: string) => string} props.resultTeaserKey
 * @param {{ id: string; href: string }[]} [props.browseLinks]
 * @param {(id: string) => string} [props.browseLinkLabelKey]
 * @param {string} [props.className]
 */
export default function RoutingQuiz({
  steps,
  rootStepId = "root",
  i18nNamespace,
  uiKeyPrefix = "quiz",
  totalQuestions: totalQuestionsProp,
  resultHref,
  resultTitleKey,
  resultQuoteKey,
  resultTeaserKey,
  browseLinks,
  browseLinkLabelKey,
  className,
}) {
  const { t } = useTranslation(i18nNamespace);
  const questionHeadingId = useId();
  const [stepStack, setStepStack] = useState([rootStepId]);
  const [resultId, setResultId] = useState(null);

  const uiKey = (suffix) => `${uiKeyPrefix}.${suffix}`;

  const currentStepId = stepStack[stepStack.length - 1];
  const step = getRoutingQuizStep(steps, currentStepId);
  const totalQuestions = totalQuestionsProp ?? getRoutingQuizMaxDepth(steps, rootStepId);
  const questionNumber = getRoutingQuizQuestionNumber(stepStack, rootStepId);

  const handleOption = (option) => {
    if (option.result) {
      setResultId(option.result);
      return;
    }
    if (option.next) {
      setStepStack((prev) => [...prev, option.next]);
    }
  };

  const goBack = () => {
    if (resultId) {
      setResultId(null);
      return;
    }
    if (stepStack.length > 1) {
      setStepStack((prev) => prev.slice(0, -1));
    }
  };

  const restart = () => {
    setStepStack([rootStepId]);
    setResultId(null);
  };

  const canGoBack = Boolean(resultId) || stepStack.length > 1;
  const rootClass = classNames("component__routing-quiz", className);

  const progressSteps = (
    <div className="component__routing-quiz__progress-meta">
      <p className="section__badge component__routing-quiz__progress-label">
        {t(uiKey("progress"), { current: questionNumber, total: totalQuestions })}
      </p>
      <div className="component__routing-quiz__steps" aria-hidden="true">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const stepIndex = index + 1;
          const stepClass =
            stepIndex < questionNumber
              ? "component__routing-quiz__step component__routing-quiz__step--done"
              : stepIndex === questionNumber
                ? "component__routing-quiz__step component__routing-quiz__step--active"
                : "component__routing-quiz__step";

          return <span key={stepIndex} className={stepClass} />;
        })}
      </div>
    </div>
  );

  if (resultId) {
    return (
      <div
        className={classNames(
          rootClass,
          "component__routing-quiz--result",
          "component__routing-quiz__panel"
        )}
        role="status"
        aria-live="polite"
      >
        <p className="section__badge component__routing-quiz__result-badge">
          {t(uiKey("result.eyebrow"))}
        </p>
        {resultQuoteKey ? (
          <p className="component__routing-quiz__result-quote">{t(resultQuoteKey(resultId))}</p>
        ) : (
          <h3 className="component__routing-quiz__result-title underline">
            {t(resultTitleKey(resultId))}
          </h3>
        )}
        <p className="big component__routing-quiz__result-teaser">{t(resultTeaserKey(resultId))}</p>
        <p className="component__routing-quiz__actions">
          <Button variant="secondary" href={resultHref(resultId)} label={t(uiKey("result.cta"))} />
        </p>
        <p className="component__routing-quiz__secondary-actions">
          <button type="button" className="component__routing-quiz__text-btn" onClick={restart}>
            {t(uiKey("result.restart"))}
          </button>
        </p>
      </div>
    );
  }

  if (!step) {
    return null;
  }

  return (
    <div
      className={classNames(rootClass, "component__routing-quiz__panel")}
      aria-labelledby={questionHeadingId}
    >
      <div className="component__routing-quiz__toolbar">
        {canGoBack ? (
          <button type="button" className="component__routing-quiz__text-btn" onClick={goBack}>
            {t(uiKey("back"))}
          </button>
        ) : (
          <span className="component__routing-quiz__toolbar-spacer" aria-hidden="true" />
        )}
        <div aria-live="polite">{progressSteps}</div>
      </div>

      <h3 id={questionHeadingId} className="component__routing-quiz__question">
        {t(step.questionKey)}
      </h3>

      <ul className="component__routing-quiz__options" role="list">
        {step.options.map((option) => (
          <li key={option.id} role="listitem">
            <button
              type="button"
              className="component__routing-quiz__option"
              onClick={() => handleOption(option)}
            >
              <span className="component__routing-quiz__option-label">
                {t(`${uiKeyPrefix}.options.${option.id}.label`)}
              </span>
              {t(`${uiKeyPrefix}.options.${option.id}.hint`, { defaultValue: "" }) ? (
                <span className="component__routing-quiz__option-hint">
                  {t(`${uiKeyPrefix}.options.${option.id}.hint`)}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {browseLinks?.length > 0 && (
        <details className="component__routing-quiz__browse">
          <summary>{t(uiKey("browseAll.summary"))}</summary>
          <ul className="component__routing-quiz__browse-list">
            {browseLinks.map((link) => (
              <li key={link.id} className="component__routing-quiz__browse-item">
                <Link href={link.href} className="component__routing-quiz__browse-link">
                  {browseLinkLabelKey ? t(browseLinkLabelKey(link.id)) : (link.label ?? link.id)}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
