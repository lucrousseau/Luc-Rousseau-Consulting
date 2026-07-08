/**
 * Allow CSS custom properties (`--foo`) in `style` objects. React accepts them at
 * runtime, but the stock `CSSProperties` type does not declare them. This project
 * drives row/section spacing through CSS variables (see `commons/pageRowSpacing`),
 * so we augment the type once here instead of casting at every call site.
 */
import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
