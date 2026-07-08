/**
 * Ambient declarations for static asset imports (Next.js resolves these to a
 * StaticImageData-like object at build time). Committed so `npm run typecheck`
 * does not depend on the generated `next-env.d.ts`.
 */

interface StaticImageImport {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}

declare module "*.jpg" {
  const content: StaticImageImport;
  export default content;
}

declare module "*.jpeg" {
  const content: StaticImageImport;
  export default content;
}

declare module "*.png" {
  const content: StaticImageImport;
  export default content;
}

declare module "*.webp" {
  const content: StaticImageImport;
  export default content;
}

declare module "*.avif" {
  const content: StaticImageImport;
  export default content;
}

declare module "*.gif" {
  const content: StaticImageImport;
  export default content;
}

declare module "*.scss";
declare module "*.css";
