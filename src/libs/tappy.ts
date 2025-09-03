import { type Device, Tappy } from "@lycorp-jp/tappy";
import { PuppeteerAdapter } from "@lycorp-jp/tappy/adapters";
import puppeteer, { type LaunchOptions } from "puppeteer";

const getLaunchOptions = async (): Promise<LaunchOptions> => {
  if (process.env.VERCEL_ENV) {
    const chromium = (await import("@sparticuz/chromium")).default;
    return {
      headless: true,
      args: chromium.args,
      executablePath: await chromium.executablePath(),
    };
  } else {
    return {
      headless: true,
      channel: "chrome",
    };
  }
};

export const analyze = async (url: string, device: Device, wait: number) => {
  const launchOptions = await getLaunchOptions();

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  const adapter = new PuppeteerAdapter(page);
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
