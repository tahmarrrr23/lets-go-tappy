"use client";

import {
  Select,
  TextField,
  Button,
  Card,
  Flex,
  Box,
  Text,
} from "@radix-ui/themes";
import { devices } from "@/libs/device";

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
    <Card size="3">
      <Box p="5">
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
              <Select.Root
                value={selectedDevice}
                onValueChange={onDeviceChange}
              >
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
    </Card>
  );
}
