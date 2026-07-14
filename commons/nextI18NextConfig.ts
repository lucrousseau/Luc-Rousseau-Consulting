import type { UserConfig } from "next-i18next/pages";

import rawNextI18NextConfig from "../next-i18next.config.js";

/** Shared next-i18next config (safe for `_app` and server pages). */
export const nextI18NextConfig = rawNextI18NextConfig as UserConfig;
