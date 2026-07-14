import classNames from "classnames";
import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="cost-calculator__field">
      <div className="cost-calculator__field-head">
        <label className="cost-calculator__field-label">{label}</label>
        {hint ? <span className="cost-calculator__field-hint">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

interface RangeFieldProps {
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  ariaLabel?: string;
}

export function RangeField({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  ariaLabel,
}: RangeFieldProps) {
  return (
    <Field label={label} hint={hint}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="cost-calculator__range"
        aria-label={ariaLabel ?? label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </Field>
  );
}

interface CheckboxFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function CheckboxField({ checked, onChange, label }: CheckboxFieldProps) {
  return (
    <label className="cost-calculator__checkbox">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

interface BreakdownSectionProps {
  title: string;
  children: ReactNode;
}

export function BreakdownSection({ title, children }: BreakdownSectionProps) {
  return (
    <section className="cost-calculator__breakdown-section">
      <h4 className="cost-calculator__breakdown-heading">{title}</h4>
      <div className="cost-calculator__breakdown-section-body">{children}</div>
    </section>
  );
}

interface InputSectionProps {
  title: string;
  children: ReactNode;
}

export function InputSection({ title, children }: InputSectionProps) {
  return (
    <details className="cost-calculator__input-section">
      <summary className="cost-calculator__input-section-summary">{title}</summary>
      <div className="cost-calculator__input-section-body">{children}</div>
    </details>
  );
}

interface CompareSideProps {
  title: string;
  lede?: string;
  tone: "employee" | "consultant";
  children: ReactNode;
  footer?: ReactNode;
}

export function CompareSide({ title, lede, tone, children, footer }: CompareSideProps) {
  return (
    <section
      className={classNames("cost-calculator__side", {
        "cost-calculator__side--employee": tone === "employee",
        "cost-calculator__side--consultant": tone === "consultant",
      })}
    >
      <header className="cost-calculator__side-head">
        <h3 className="cost-calculator__side-title">{title}</h3>
        {lede ? <p className="cost-calculator__side-lede">{lede}</p> : null}
      </header>
      <div className="cost-calculator__side-body">{children}</div>
      {footer ? <footer className="cost-calculator__side-foot">{footer}</footer> : null}
    </section>
  );
}

interface SideTotalsProps {
  tone: "employee" | "consultant";
  dayLabel: string;
  dayValue: string;
  daySub?: string;
  dayExtra?: ReactNode;
  annualLabel: string;
  annualValue: string;
  annualSub?: string;
}

export function SideTotals({
  tone,
  dayLabel,
  dayValue,
  daySub,
  dayExtra,
  annualLabel,
  annualValue,
  annualSub,
}: SideTotalsProps) {
  return (
    <>
      <div className="cost-calculator__side-metric">
        <span className="cost-calculator__side-metric-label">{dayLabel}</span>
        <span
          className={classNames("cost-calculator__side-metric-value", {
            "cost-calculator__side-metric-value--consultant": tone === "consultant",
            "cost-calculator__side-metric-value--employee": tone === "employee",
          })}
        >
          {dayValue}
        </span>
        {daySub ? <span className="cost-calculator__side-metric-sub">{daySub}</span> : null}
        {dayExtra}
      </div>
      <div className="cost-calculator__side-metric cost-calculator__side-metric--annual">
        <span className="cost-calculator__side-metric-label">{annualLabel}</span>
        <span
          className={classNames("cost-calculator__side-metric-value", {
            "cost-calculator__side-metric-value--consultant": tone === "consultant",
            "cost-calculator__side-metric-value--employee": tone === "employee",
          })}
        >
          {annualValue}
        </span>
        {annualSub ? <span className="cost-calculator__side-metric-sub">{annualSub}</span> : null}
      </div>
    </>
  );
}

export interface BreakdownListItem {
  key: string;
  label: ReactNode;
  value: ReactNode;
  tone?: "total" | "consultant";
}

interface BreakdownListProps {
  items: BreakdownListItem[];
  footer?: ReactNode;
}

export function BreakdownList({ items, footer }: BreakdownListProps) {
  if (items.length === 0) {
    return footer ? <>{footer}</> : null;
  }

  return (
    <>
      <ul className="cost-calculator__breakdown-list">
        {items.map((item) => (
          <li
            key={item.key}
            className={classNames("cost-calculator__breakdown-item", {
              "cost-calculator__breakdown-item--total": item.tone === "total",
              "cost-calculator__breakdown-item--consultant": item.tone === "consultant",
            })}
          >
            <span>{item.label}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
      {footer}
    </>
  );
}
