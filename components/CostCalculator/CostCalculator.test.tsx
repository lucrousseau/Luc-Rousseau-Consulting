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
    query: {},
    isReady: true,
  }),
}));

describe("CostCalculator", () => {
  it("shows the mission type from the page role as plain text", () => {
    render(<CostCalculator role="developer" />);

    expect(screen.getByText("fields.role.options.developer")).toBeInTheDocument();
    expect(screen.getByText("fields.role.note")).toBeInTheDocument();
    expect(screen.queryByRole("combobox", { name: "fields.role.label" })).not.toBeInTheDocument();
  });

  it("renders a fixed standard day rate with exception note", () => {
    const { container } = render(<CostCalculator />);

    expect(container.querySelector(".cost-calculator__rate-value")).toHaveTextContent(/900/);
    expect(screen.getByText("fields.dayRate.note")).toBeInTheDocument();
    expect(
      screen.queryByRole("combobox", { name: "fields.engagementTier.label" })
    ).not.toBeInTheDocument();
  });

  it("keeps the same base day rate for either mission role", () => {
    const { container, rerender } = render(<CostCalculator role="productManager" />);
    expect(container.querySelector(".cost-calculator__rate-value")).toHaveTextContent(/900/);

    rerender(<CostCalculator role="developer" />);
    expect(container.querySelector(".cost-calculator__rate-value")).toHaveTextContent(/900/);
  });

  it("shows the volume-discounted day rate at 3 billed days", () => {
    const { container } = render(<CostCalculator />);

    fireEvent.click(screen.getByRole("button", { name: "3" }));

    // 900 × 0.9 = 810
    expect(container.querySelector(".cost-calculator__rate-value")).toHaveTextContent(/810/);
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
    expect(screen.getByText("inputs.employee.lede")).toBeInTheDocument();
    expect(screen.getByText("inputs.consultant.title")).toBeInTheDocument();
    expect(screen.getByText("inputs.consultant.lede")).toBeInTheDocument();
    expect(screen.getByText("inputs.vs")).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "fields.salary.label" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "fields.billedDays.label" })).toBeInTheDocument();

    const consultant = screen.getByText("inputs.consultant.title");
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
