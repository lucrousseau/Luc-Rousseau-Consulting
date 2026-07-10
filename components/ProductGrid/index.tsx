import type { ReactNode } from "react";

import Row from "../Layout/Row";
import Product from "../Product";

const DEFAULT_COLS = { col: 4, lg: 10, sm: 12 };

type ProductGridProps<T extends object> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  cols?: Record<string, number | string>;
  productClassName?: string;
  getItemKey?: (item: T) => React.Key | undefined;
};

export default function ProductGrid<T extends object>({
  items,
  renderItem,
  cols = DEFAULT_COLS,
  productClassName = "align--lg-left",
  getItemKey = (item) => ("title" in item ? (item.title as React.Key) : undefined),
}: ProductGridProps<T>) {
  if (!items?.length) {
    return null;
  }

  const columns = items.map((item) => ({
    cols,
    content: (
      <Product
        key={getItemKey(item)}
        title={"title" in item ? String(item.title ?? "") : undefined}
        className={productClassName}
      >
        {renderItem(item)}
      </Product>
    ),
  }));

  return <Row halign="center" columns={columns} />;
}
