"use client";

import { Device } from "@lycorp-jp/tappy";
import { ComponentPropsWithoutRef } from "react";
import styles from "./device-mock.module.scss";
import { Card } from "@radix-ui/themes";
export interface DeviceMockProps extends ComponentPropsWithoutRef<"div"> {
  device: Device;
}

export const DeviceMock = (props: DeviceMockProps) => {
  const { device, children, ...rest } = props;

  return (
    <Card {...rest}>
      <div className={`${styles["root"]}`}>
        <div
          style={{
            width: `${device.width}px`,
            height: `${device.height}px`,
          }}
        >
          {children}
        </div>
      </div>
    </Card>
  );
};
