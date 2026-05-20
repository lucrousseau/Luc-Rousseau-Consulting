import Row from "../Layout/Row";
import Product from "../Product";

const DEFAULT_COLS = { col: 4, lg: 10, sm: 12 };

export default function ProductGrid({
  items,
  renderItem,
  cols = DEFAULT_COLS,
  productClassName = "align--lg-left",
  getItemKey = (item) => item.title,
}) {
  if (!items?.length) {
    return null;
  }

  const columns = items.map((item) => ({
    cols,
    content: (
      <Product key={getItemKey(item)} title={item.title} className={productClassName}>
        {renderItem(item)}
      </Product>
    ),
  }));

  return <Row halign="center" columns={columns} />;
}
