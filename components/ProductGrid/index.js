import Row from "../Layout/Row";
import Product from "../Product";

const DEFAULT_COLS = { col: 4, lg: 10, sm: 12 };

/**
 * @template T
 * @param {object} props
 * @param {T[]} props.items
 * @param {(item: T) => import('react').ReactNode} props.renderItem
 * @param {Record<string, number | string>} [props.cols]
 * @param {string} [props.productClassName]
 * @param {(item: T) => (import('react').Key | undefined)} [props.getItemKey]
 */
export default function ProductGrid({
  items,
  renderItem,
  cols = DEFAULT_COLS,
  productClassName = "align--lg-left",
  getItemKey = (item) => /** @type {{ title?: string }} */ (item).title,
}) {
  if (!items?.length) {
    return null;
  }

  const columns = items.map((item) => ({
    cols,
    content: (
      <Product
        key={getItemKey(item)}
        title={/** @type {{ title?: string }} */ (item).title}
        className={productClassName}
      >
        {renderItem(item)}
      </Product>
    ),
  }));

  return <Row halign="center" columns={columns} />;
}
