import { type Device, Tappy } from "@lycorp-jp/tappy";
import { PuppeteerAdapter } from "@lycorp-jp/tappy/adapters";

const setupPuppeteer = async () => {
  const isVercel = !!process.env.VERCEL_ENV;
  if (isVercel) {
    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteer = await import("puppeteer-core");
    return await puppeteer.launch({
      headless: true,
      args: chromium.args,
      executablePath: await chromium.executablePath(),
    });
  } else {
    const puppeteer = await import("puppeteer");
    return await puppeteer.launch({
      headless: true,
    });
  }
};

export const analyze = async (url: string, device: Device, wait: number) => {
  const browser = await setupPuppeteer();
  const page = await browser.newPage();

  // biome-ignore lint/suspicious/noExplicitAny: Type compatibility issue between puppeteer and puppeteer-core
  const adapter = new PuppeteerAdapter(page as any);
  await adapter.page.setViewport({
    width: device.width,
    height: device.height,
    deviceScaleFactor: device.scaleFactor,
  });
  await adapter.page.goto(url);
  await new Promise((resolve) => setTimeout(resolve, wait));

  const tappy = new Tappy(adapter);
  const result = await tappy.analyze(device);
  await browser.close();

  return result;
};
