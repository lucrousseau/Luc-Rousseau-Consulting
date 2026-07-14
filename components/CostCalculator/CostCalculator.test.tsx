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
    pathname: "/cout-reel-jour/pm",
    query: mockRouterQuery,
    isReady: true,
  }),
}));

const mockRouterQuery: Record<string, string | string[]> = {};

describe("CostCalculator", () => {
  beforeEach(() => {
    Object.keys(mockRouterQuery).forEach((key) => {
      delete mockRouterQuery[key];
    });
  });
  it("puts the mission role in the consultant side title", () => {
    render(<CostCalculator role="developer" />);

    expect(
      screen.getByRole("heading", {
        name: (_, el) => Boolean(el?.textContent?.startsWith("inputs.consultant.title")),
      })
    ).toBeInTheDocument();
    expect(screen.queryByRole("combobox", { name: "fields.role.label" })).not.toBeInTheDocument();
  });

  it("shows the effective day rate in the consultant side totals", () => {
    render(<CostCalculator />);

    expect(screen.getByText("results.dayCost.consultantLabel")).toBeInTheDocument();
    expect(screen.getByText(/900/)).toBeInTheDocument();
    expect(
      screen.queryByRole("combobox", { name: "fields.engagementTier.label" })
    ).not.toBeInTheDocument();
  });

  it("keeps the same base day rate for either mission role", () => {
    const { rerender } = render(<CostCalculator role="productManager" />);
    expect(screen.getAllByText(/900/).length).toBeGreaterThanOrEqual(1);

    rerender(<CostCalculator role="developer" />);
    expect(screen.getAllByText(/900/).length).toBeGreaterThanOrEqual(1);
  });

  it("shows the volume-discounted day rate at 3 billed days", () => {
    render(<CostCalculator />);

    fireEvent.click(screen.getByRole("button", { name: "3" }));

    // 900 × 0.9 = 810
    expect(screen.getAllByText(/810/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/fields\.billedDays\.volumeDiscount/)).toBeInTheDocument();
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

  it("groups inputs into employee vs consultant sides", () => {
    render(<CostCalculator />);

    expect(screen.getByText("inputs.employee.title")).toBeInTheDocument();
    const consultant = screen.getByRole("heading", {
      name: (_, el) => Boolean(el?.textContent?.startsWith("inputs.consultant.title")),
    });
    expect(screen.getByText("inputs.vs")).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "fields.salary.label" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "fields.billedDays.label" })).toBeInTheDocument();

    const employee = screen.getByText("inputs.employee.title");
    expect(
      consultant.compareDocumentPosition(employee) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("shows salary in the employee side and keeps advanced options labeled", () => {
    render(<CostCalculator />);

    expect(screen.getByRole("slider", { name: "fields.salary.label" })).toBeInTheDocument();
    expect(screen.getByText("fields.advanced.label")).toBeInTheDocument();
  });

  it("seeds gross salary from the salaire query param", () => {
    mockRouterQuery.salaire = "140000";
    render(<CostCalculator role="developer" />);

    expect(screen.getByRole("slider", { name: "fields.salary.label" })).toHaveValue("140000");
  });

  it("leads with a results-first sticky summary, not savings-led pills", () => {
    render(<CostCalculator />);

    expect(screen.getByText("results.verdict.kicker")).toBeInTheDocument();
    expect(
      screen.getByText((_, el) =>
        Boolean(
          el?.textContent?.startsWith("results.verdict.ideal.headline") ||
          el?.textContent?.startsWith("results.verdict.ceiling.headline")
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, el) =>
          el?.textContent === "results.verdict.ideal.sub" ||
          el?.textContent === "results.verdict.ceiling.sub"
      )
    ).toBeInTheDocument();
    expect(screen.queryByText("results.verdict.points.results")).not.toBeInTheDocument();
    expect(screen.queryByText("results.verdict.cap")).not.toBeInTheDocument();
  });

  it("caps the billed-days picker at 3 (Luc's max availability)", () => {
    render(<CostCalculator />);

    const dayPicker = screen.getByRole("group", { name: "fields.billedDays.label" });
    const options = within(dayPicker).getAllByRole("button");
    expect(options.map((b) => b.textContent)).toEqual(["1", "2", "3"]);
  });

  it("shows day and annual totals in each compare side", () => {
    render(<CostCalculator />);

    expect(screen.getByText("results.dayCost.consultantLabel")).toBeInTheDocument();
    expect(screen.getByText("results.dayCost.steadyLabel")).toBeInTheDocument();
    expect(screen.getByText("results.dayCost.yearOneLabel")).toBeInTheDocument();
    expect(screen.getAllByText("results.annual.employeeLabel").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText((_, el) =>
        Boolean(el?.textContent?.startsWith("results.annual.consultantLabel"))
      ).length
    ).toBeGreaterThanOrEqual(1);
  });

  it("labels the first-year recruitment cost without a ramp-up dollar line", () => {
    render(<CostCalculator />);

    expect(screen.getByText("results.yearOne.recruitment")).toBeInTheDocument();
    expect(screen.queryByText("results.breakdown.lines.onboarding")).not.toBeInTheDocument();
  });
});
