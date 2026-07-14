import { fireEvent, render, screen, within } from "@testing-library/react";

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

    const roleSelect = screen.getByRole("combobox", { name: "fields.role.label" });
    expect(roleSelect).toBeInTheDocument();
    expect(within(roleSelect).getByText("fields.role.options.developer")).toBeInTheDocument();
    expect(within(roleSelect).getByText("fields.role.options.productManager")).toBeInTheDocument();
    expect(screen.getByText("results.breakdown.lines.qpp")).toBeInTheDocument();
    expect(screen.getByText("results.recurring.coordination")).toBeInTheDocument();
    expect(screen.getByText("results.notes.title")).toBeInTheDocument();
  });

  it("renders engagement day-rate tiers as a compact select", () => {
    render(<CostCalculator />);

    const engagementSelect = screen.getByRole("combobox", {
      name: "fields.engagementTier.label",
    });
    expect(
      within(engagementSelect).getByText(/fields\.engagementTier\.options\.productManager\.ongoing/)
    ).toBeInTheDocument();
    expect(
      within(engagementSelect).getByText(
        /fields\.engagementTier\.options\.productManager\.structural/
      )
    ).toBeInTheDocument();
    expect(screen.queryByText("fields.engagementTier.help")).not.toBeInTheDocument();
    expect(screen.getByText("fields.engagementTier.note")).toBeInTheDocument();
  });

  it("shows developer senior and team-lead engagement options", () => {
    render(<CostCalculator />);

    fireEvent.change(screen.getByRole("combobox", { name: "fields.role.label" }), {
      target: { value: "developer" },
    });

    const engagementSelect = screen.getByRole("combobox", {
      name: "fields.engagementTier.label",
    });
    expect(
      within(engagementSelect).getByText(/fields\.engagementTier\.options\.developer\.ongoing/)
    ).toBeInTheDocument();
    expect(
      within(engagementSelect).getByText(/fields\.engagementTier\.options\.developer\.structural/)
    ).toBeInTheDocument();
    expect(engagementSelect).toHaveValue("ongoing");
  });

  it("shows discounted day rates in the engagement select at 3 billed days", () => {
    render(<CostCalculator />);

    fireEvent.click(screen.getByRole("button", { name: "3" }));

    const engagementSelect = screen.getByRole("combobox", {
      name: "fields.engagementTier.label",
    });
    // 1 100 × 0.9 = 990 ; 900 × 0.9 = 810
    expect(within(engagementSelect).getByText(/990/)).toBeInTheDocument();
    expect(within(engagementSelect).getByText(/810/)).toBeInTheDocument();
  });

  it("renders the workplace cost modes without a manual slider", () => {
    render(<CostCalculator />);

    const workplaceSelect = screen.getByRole("combobox", { name: "fields.workplace.label" });
    expect(
      within(workplaceSelect).getByText(/fields\.workplace\.options\.office/)
    ).toBeInTheDocument();
    expect(
      within(workplaceSelect).getByText(/fields\.workplace\.options\.hybrid/)
    ).toBeInTheDocument();
    expect(
      within(workplaceSelect).getByText(/fields\.workplace\.options\.remote/)
    ).toBeInTheDocument();
    expect(screen.getByText("results.recurring.workplace")).toBeInTheDocument();
    expect(within(workplaceSelect).queryByRole("slider")).not.toBeInTheDocument();
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
