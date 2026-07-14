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
    expect(screen.getByText("results.notes.title")).toBeInTheDocument();
  });

  it("renders compact engagement day-rate tiers without inline descriptions", () => {
    render(<CostCalculator />);

    expect(screen.getByText("fields.engagementTier.options.ongoing")).toBeInTheDocument();
    expect(screen.getByText("fields.engagementTier.options.structural")).toBeInTheDocument();
    expect(screen.getByText("fields.engagementTier.options.turnaround")).toBeInTheDocument();
    expect(
      screen.queryByText("fields.engagementTier.descriptions.structural")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("fields.engagementTier.help")).not.toBeInTheDocument();
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
    expect(screen.getByText("results.consultantConsiderations.text")).toBeInTheDocument();
  });

  it("collapses advanced slider and checkbox sections by default", () => {
    render(<CostCalculator />);

    const sections = document.querySelectorAll(".cost-calculator__input-section");
    expect(sections.length).toBeGreaterThanOrEqual(4);
    sections.forEach((section) => {
      expect(section).not.toHaveAttribute("open");
    });
  });

  it("shows salary in the primary surface and keeps advanced options labeled", () => {
    render(<CostCalculator />);

    expect(screen.getByRole("slider", { name: "fields.salary.label" })).toBeInTheDocument();
    expect(screen.getByText("fields.advanced.label")).toBeInTheDocument();
  });

  it("leads with a compact verdict without marketing pills", () => {
    render(<CostCalculator />);

    expect(screen.getByText("results.verdict.kicker")).toBeInTheDocument();
    expect(screen.queryByText("results.verdict.points.results")).not.toBeInTheDocument();
    expect(screen.queryByText("results.verdict.cap")).not.toBeInTheDocument();
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
    expect(screen.getByText("results.annual.employeeLabel")).toBeInTheDocument();
  });

  it("labels the first-year recruitment cost without a ramp-up dollar line", () => {
    render(<CostCalculator />);

    expect(screen.getByText("results.yearOne.recruitment")).toBeInTheDocument();
    expect(screen.queryByText("results.breakdown.lines.onboarding")).not.toBeInTheDocument();
  });
});
