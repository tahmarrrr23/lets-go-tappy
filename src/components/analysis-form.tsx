"use client";

import { devices } from "@/libs/device";
import { Button, Flex, Select, TextField } from "@radix-ui/themes";

interface AnalysisFormProps {
  url: string;
  selectedDevice: string;
  isLoading: boolean;
  onUrlChange: (url: string) => void;
  onDeviceChange: (device: string) => void;
  onExecute: () => void;
}

export function AnalysisForm({
  url,
  selectedDevice,
  isLoading,
  onUrlChange,
  onDeviceChange,
  onExecute,
}: AnalysisFormProps) {
  const deviceNames = Object.keys(devices);

  return (
    <Flex justify="end" align="center" gap="2" p="4">
      <TextField.Root
        placeholder="https://example.com"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        size="3"
      />

      <Select.Root
        value={selectedDevice}
        size="3"
        onValueChange={onDeviceChange}
      >
        <Select.Trigger placeholder="Please select a device" />
        <Select.Content position="popper" sideOffset={4}>
          <Select.Group>
            {deviceNames.map((deviceName) => (
              <Select.Item key={deviceName} value={deviceName}>
                {deviceName}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Button
        size="3"
        onClick={onExecute}
        disabled={isLoading || !url || !selectedDevice}
      >
        {isLoading ? "Executing..." : "Execute"}
      </Button>
    </Flex>
  );
}
