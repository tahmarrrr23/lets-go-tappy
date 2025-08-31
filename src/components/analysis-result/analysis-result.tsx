import { AnalyzeResult } from "@lycorp-jp/tappy";
import { Box } from "@radix-ui/themes";

export type AnalysisResultProps = {
  result: AnalyzeResult;
};

export const AnalysisResult = ({ result }: AnalysisResultProps) => {
  return (
    <Box
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
      }}
    >
      <img
        src={`data:image/png;base64,${result.screenshot}`}
        alt="Screenshot"
        style={{
          width: `${result.device.width}px`,
          display: "block",
        }}
      />

      {result.elements.map((element, index) => (
        <Box
          key={index}
          style={{
            position: "absolute",
            left: `${element.left}px`,
            top: `${element.top}px`,
            width: `${element.width}px`,
            height: `${element.height}px`,
            border: "2px solid rgba(59, 130, 246, 0.8)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            pointerEvents: "none",
            borderRadius: "2px",
          }}
        >
          <Box
            style={{
              position: "absolute",
              bottom: "-24px",
              right: "0",
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
  );
};
