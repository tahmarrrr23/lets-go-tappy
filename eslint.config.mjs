import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint/config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import('@eslint/config-helpers').ConfigWithExtendsArray} */
const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  { rules: { "@next/next/no-img-element": "off" } },
];

export default defineConfig(config);
