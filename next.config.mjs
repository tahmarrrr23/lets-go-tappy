/** @type {import('next').NextConfig} */
const config = {
  devIndicators: false,
  serverExternalPackages: [
    "@lycorp-jp/tappy",
    "@sparticuz/chromium",
    "puppeteer",
  ],
};

export default config;
