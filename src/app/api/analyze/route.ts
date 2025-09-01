import { type NextRequest, NextResponse } from "next/server";
import { devices } from "@/libs/device";
import { analyze } from "@/libs/tappy";

export async function POST(request: NextRequest) {
  try {
    const { url, deviceName, wait } = await request.json();
    const device = devices[deviceName];
    const result = await analyze(url, device, wait);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: `ERROR` }, { status: 500 });
  }
}
