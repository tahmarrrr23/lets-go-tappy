/** @type {import('next').NextConfig} */
const config = {
  devIndicators: false,
  serverExternalPackages: [
    "@sparticuz/chromium",
    "puppeteer-core",
    "@lycorp-jp/tappy",
  ],
};

export default config;
