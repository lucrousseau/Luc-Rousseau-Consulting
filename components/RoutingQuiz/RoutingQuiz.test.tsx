import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import RoutingQuiz from "./index";
import { trackCtaClick, trackEvent } from "../../utils/analytics";

jest.mock("next-i18next/pages", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
    className?: string;
  }) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("../../utils/analytics", () => ({
  trackEvent: jest.fn(),
  trackCtaClick: jest.fn(),
}));

const steps = {
  root: {
    questionKey: "quiz.questions.root",
    options: [
      { id: "opt-a", next: "step-2" },
      { id: "opt-b", result: "situation-a" },
    ],
  },
  "step-2": {
    questionKey: "quiz.questions.step-2",
    options: [{ id: "opt-c", result: "situation-b" }],
  },
};

describe("RoutingQuiz analytics", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("tracks option select and result", async () => {
    render(
      <RoutingQuiz
        steps={steps}
        i18nNamespace="situations-index"
        resultHref={(id) => `/situations/${id}`}
        resultTitleKey={(id) => `title.${id}`}
        resultTeaserKey={(id) => `teaser.${id}`}
        trackSection="home-quiz"
      />
    );

    fireEvent.click(screen.getByText("quiz.options.opt-b.label"));

    expect(trackEvent).toHaveBeenCalledWith("quiz_select", {
      section: "home-quiz",
      step: "root",
      option: "opt-b",
      question: 1,
    });
    expect(trackEvent).toHaveBeenCalledWith("quiz_result", {
      section: "home-quiz",
      result: "situation-a",
    });

    await waitFor(() => {
      expect(screen.getByText("quiz.result.cta")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("quiz.result.cta"));
    expect(trackCtaClick).toHaveBeenCalledWith("home-quiz-result", {
      result: "situation-a",
    });
  });

  it("tracks browse open and browse link", () => {
    render(
      <RoutingQuiz
        steps={steps}
        i18nNamespace="situations-index"
        resultHref={(id) => `/situations/${id}`}
        resultTitleKey={(id) => `title.${id}`}
        resultTeaserKey={(id) => `teaser.${id}`}
        trackSection="situations-quiz"
        browseLinks={[{ id: "situation-a", href: "/situations/situation-a" }]}
        browseLinkLabelKey={(id) => `browse.${id}`}
      />
    );

    const details = screen.getByText("quiz.browseAll.summary").closest("details");
    expect(details).toBeTruthy();
    if (details) {
      details.open = true;
      fireEvent(details, new Event("toggle", { bubbles: true }));
    }

    expect(trackEvent).toHaveBeenCalledWith("quiz_browse_open", {
      section: "situations-quiz",
    });

    fireEvent.click(screen.getByText("browse.situation-a"));
    expect(trackCtaClick).toHaveBeenCalledWith("situations-quiz-browse", {
      result: "situation-a",
    });
  });
});
