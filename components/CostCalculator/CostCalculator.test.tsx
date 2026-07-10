import { render, screen, within } from "@testing-library/react";

import CostCalculator from "./index";

jest.mock("next-i18next/pages", () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      if (params) {
        return `${key}:${JSON.stringify(params)}`;
      }
      return key;
    },
  }),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    locale: "fr",
  }),
}));

describe("CostCalculator", () => {
  it("renders Quebec 2026 breakdown lines and role selector", () => {
    render(<CostCalculator />);

    expect(screen.getByText("fields.role.options.developer")).toBeInTheDocument();
    expect(screen.getByText("fields.role.options.productManager")).toBeInTheDocument();
    expect(screen.getByText("results.breakdown.lines.qpp")).toBeInTheDocument();
    expect(screen.getByText("results.recurring.coordination")).toBeInTheDocument();
    expect(screen.getByText("results.autonomy.kicker")).toBeInTheDocument();
  });

  it("renders the engagement day-rate tiers with descriptions and no manual slider", () => {
    render(<CostCalculator />);

    expect(screen.getByText("fields.engagementTier.options.ongoing")).toBeInTheDocument();
    expect(screen.getByText("fields.engagementTier.options.structural")).toBeInTheDocument();
    expect(screen.getByText("fields.engagementTier.options.turnaround")).toBeInTheDocument();
    expect(screen.getByText("fields.engagementTier.descriptions.structural")).toBeInTheDocument();
    expect(screen.queryByText("fields.dayRate.label")).not.toBeInTheDocument();
  });

  it("renders the workplace cost modes without a manual slider", () => {
    render(<CostCalculator />);

    expect(screen.getByText("fields.workplace.options.office")).toBeInTheDocument();
    expect(screen.getByText("fields.workplace.options.hybrid")).toBeInTheDocument();
    expect(screen.getByText("fields.workplace.options.remote")).toBeInTheDocument();
    expect(screen.getByText("results.recurring.workplace")).toBeInTheDocument();

    const workplaceGroup = screen.getByRole("group", { name: "fields.workplace.label" });
    expect(within(workplaceGroup).queryByRole("slider")).not.toBeInTheDocument();
  });

  it("renders variable pay, employee lifecycle and the honesty notes", () => {
    render(<CostCalculator />);

    expect(screen.getByText("fields.bonus.label")).toBeInTheDocument();
    expect(screen.getByText("fields.turnover.include")).toBeInTheDocument();
    expect(screen.getByText("fields.severance.include")).toBeInTheDocument();
    expect(screen.getByText("results.lifecycle.title")).toBeInTheDocument();
    expect(screen.getByText("results.breakdown.lines.bonus")).toBeInTheDocument();
    expect(screen.getByText("results.taxes.note")).toBeInTheDocument();
    expect(screen.getByText("results.consultantConsiderations.kicker")).toBeInTheDocument();
  });

  it("collapses slider and checkbox sections by default", () => {
    render(<CostCalculator />);

    const sections = document.querySelectorAll(".cost-calculator__input-section");
    expect(sections.length).toBeGreaterThanOrEqual(4);
    sections.forEach((section) => {
      expect(section).not.toHaveAttribute("open");
    });
  });

  it("leads with a results-oriented verdict banner and the 3-day cap", () => {
    render(<CostCalculator />);

    expect(screen.getByText("results.verdict.kicker")).toBeInTheDocument();
    expect(screen.getByText("results.verdict.points.results")).toBeInTheDocument();
    expect(screen.getByText("results.verdict.points.speed")).toBeInTheDocument();
    expect(screen.getByText("results.verdict.points.flex")).toBeInTheDocument();
    expect(screen.getByText("results.verdict.cap")).toBeInTheDocument();
  });

  it("caps the billed-days picker at 3 (Luc's max availability)", () => {
    render(<CostCalculator />);

    const dayPicker = screen.getByRole("group", { name: "fields.billedDays.label" });
    const options = within(dayPicker).getAllByRole("button");
    expect(options.map((b) => b.textContent)).toEqual(["1", "2", "3"]);
  });

  it("shows both steady-state and year-1 day cost, plus the annual commitment", () => {
    render(<CostCalculator />);

    expect(screen.getByText("results.dayCost.steadyLabel")).toBeInTheDocument();
    expect(screen.getByText("results.dayCost.yearOneLabel")).toBeInTheDocument();
    expect(screen.getByText("results.annual.kicker")).toBeInTheDocument();
  });

  it("labels the first-year recruitment cost without a ramp-up dollar line", () => {
    render(<CostCalculator />);

    expect(screen.getByText("results.yearOne.recruitment")).toBeInTheDocument();
    expect(screen.queryByText("results.breakdown.lines.onboarding")).not.toBeInTheDocument();
  });
});
