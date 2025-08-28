import { AnalyzeResult, Device } from "@lycorp-jp/tappy";
import { Box, Card, Heading } from "@radix-ui/themes";

export type TappyResultProps = {
  result: AnalyzeResult;
  device: Device;
};

export const TappyResult = ({ result, device }: TappyResultProps) => {
  return (
    <Card size="3">
      <Box p="5">
        <Heading size="4" mb="4">
          Analysis Results
        </Heading>

        {/* Screenshot with overlaid elements */}
        <Box
          mb="4"
          style={{
            position: "relative",
            display: "inline-block",
            overflow: "hidden",
            border: "1px solid var(--gray-6)",
          }}
        >
          <img
            src={`data:image/png;base64,${result.screenshot}`}
            alt="Screenshot"
            style={{
              width: `${device.width}px`,
              display: "block",
            }}
          />

          {/* Overlay tappable elements */}
          {result.elements.map((element, index) => (
            <Box
              key={index}
              style={{
                position: "absolute",
                left: `${element.left}px`,
                top: `${element.top}px`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                border: "2px solid rgba(59, 130, 246, 0.8)", // Blue border
                backgroundColor: "rgba(59, 130, 246, 0.1)", // Semi-transparent blue
                pointerEvents: "none",
                borderRadius: "2px",
              }}
            >
              {/* Success rate label */}
              <Box
                style={{
                  position: "absolute",
                  top: "-24px",
                  left: "0",
                  backgroundColor: "rgba(59, 130, 246, 0.9)",
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: "3px",
                  fontSize: "11px",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                }}
              >
                {Math.round(element.tapSuccessRate * 100)}%
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
};
