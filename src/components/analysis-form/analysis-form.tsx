import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Select, TextField } from "@radix-ui/themes";
import { devices } from "../../libs/device";

interface AnalysisFormProps {
  url: string;
  selectedDevice: string;
  wait: number;
  isLoading: boolean;
  onUrlChange: (url: string) => void;
  onDeviceChange: (device: string) => void;
  onWaitChange: (wait: number) => void;
  onExecute: () => void;
}

export function AnalysisForm({
  url,
  selectedDevice,
  wait,
  isLoading,
  onUrlChange,
  onDeviceChange,
  onWaitChange,
  onExecute,
}: AnalysisFormProps) {
  const deviceOptions = Object.keys(devices);

  return (
    <Flex gap="2" p="4">
      <Box width="100%">
        <TextField.Root
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          size="3"
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Slot side="right">
            <Select.Root
              value={selectedDevice}
              onValueChange={onDeviceChange}
              size="2"
            >
              <Select.Trigger placeholder="Device" variant="ghost" />
              <Select.Content>
                {deviceOptions.map((deviceName) => (
                  <Select.Item key={deviceName} value={deviceName}>
                    {deviceName}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </TextField.Slot>
        </TextField.Root>
      </Box>

      <Box>
        <TextField.Root
          type="number"
          value={wait.toString()}
          onChange={(e) => onWaitChange(Number(e.target.value))}
          size="3"
        >
          <TextField.Slot side="right">ms</TextField.Slot>
        </TextField.Root>
      </Box>

      <Button size="3" onClick={onExecute} disabled={isLoading || !url}>
        {isLoading ? "Executing..." : "Execute"}
      </Button>
    </Flex>
  );
}
