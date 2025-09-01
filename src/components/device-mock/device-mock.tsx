import type { Device } from "@lycorp-jp/tappy";
import { Card } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";
import styles from "./device-mock.module.scss";

export interface DeviceMockProps extends PropsWithChildren {
  device: Device;
}

export const DeviceMock = (props: DeviceMockProps) => {
  const { device, children } = props;

  return (
    <Card>
      <div className={styles.container}>
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
