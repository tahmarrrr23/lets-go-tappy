import { type Device, Tappy } from "@lycorp-jp/tappy";
import { PuppeteerAdapter } from "@lycorp-jp/tappy/adapters";
import puppeteer from "puppeteer";

export const analyze = async (url: string, device: Device) => {
  const browser = await puppeteer.launch({ headless: true, channel: "chrome" });
  const page = await browser.newPage();

  const adapter = new PuppeteerAdapter(page);
  const tappy = new Tappy(adapter);

  const result = await tappy.analyze(url, device);
  await browser.close();

  return result;
};
