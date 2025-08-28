"use client";

import { devices } from "@/libs/device";
import { Box, Button, Flex, Select, Text, TextField } from "@radix-ui/themes";

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
    <Box
      p="9"
      position={"fixed"}
      top={"0"}
      left={"0"}
      width={"100%"}
      style={{
        backgroundColor: "white",
        zIndex: 1000,
        border: "1px solid var(--gray-6)",
      }}
    >
      <Flex direction="column" gap="5">
        {/* URL input */}
        <Box>
          <Flex direction="column" gap="2">
            <Text as="label" size="2" weight="medium" color="gray">
              URL
            </Text>
            <TextField.Root
              placeholder="https://example.com"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              size="3"
              style={{ width: "100%" }}
            />
          </Flex>
        </Box>

        {/* Device selection */}
        <Box>
          <Flex direction="column" gap="2">
            <Text as="label" size="2" weight="medium" color="gray">
              Device
            </Text>
            <Select.Root value={selectedDevice} onValueChange={onDeviceChange}>
              <Select.Trigger
                placeholder="Please select a device"
                style={{ width: "100%" }}
              />
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
          </Flex>
        </Box>

        {/* Execute button */}
        <Box pt="2">
          <Button
            size="3"
            onClick={onExecute}
            disabled={isLoading || !url || !selectedDevice}
            style={{ width: "100%" }}
          >
            {isLoading ? "Executing..." : "Execute"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
