import type { Device } from "@lycorp-jp/tappy";

const devices: { [key: string]: Device } = {
  VGA: {
    name: "VGA",
    width: 640,
    height: 480,
    ppi: 96,
    scaleFactor: 1,
  },
  SD: {
    name: "SD(SDTV)",
    width: 720,
    height: 480,
    ppi: 72,
    scaleFactor: 1,
  },
  XGA: {
    name: "XGA",
    width: 1024,
    height: 768,
    ppi: 96,
    scaleFactor: 1,
  },
  HDTV: {
    name: "HDTV",
    width: 1280,
    height: 720,
    ppi: 96,
    scaleFactor: 1,
  },
};

export { devices };
