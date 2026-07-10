import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  ariaLabel: string;
  className?: string;
};

/** Accessible breadcrumb trail. Last item is the current page (no link). */
export default function Breadcrumbs({ items, ariaLabel, className }: BreadcrumbsProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <nav className={className ?? "component__breadcrumbs"} aria-label={ariaLabel}>
      <ol className="component__breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="component__breadcrumbs__item">
              {item.href && !isLast ? (
                <Link href={item.href} className="component__breadcrumbs__link">
                  {item.label}
                </Link>
              ) : (
                <span
                  className="component__breadcrumbs__current"
                  {...(isLast ? { "aria-current": "page" } : {})}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span className="component__breadcrumbs__sep" aria-hidden="true">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
