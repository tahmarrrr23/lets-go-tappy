"use client";

import { AnalysisForm } from "@/components/analysis-form";
import { TappyResult } from "@/components/tappy-result";
import { devices } from "@/libs/device";
import { AnalyzeResult } from "@lycorp-jp/tappy";
import { Box, Container } from "@radix-ui/themes";
import { useState } from "react";

export default function Root() {
  const [url, setUrl] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExecute = async () => {
    setIsLoading(true);
    setResult(null);

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        deviceName: selectedDevice,
      }),
    });

    const analysisResult = await response.json();

    setResult(analysisResult);
    setIsLoading(false);
  };

  return (
    <Container size="3">
      <AnalysisForm
        url={url}
        selectedDevice={selectedDevice}
        isLoading={isLoading}
        onUrlChange={setUrl}
        onDeviceChange={setSelectedDevice}
        onExecute={handleExecute}
      />

      {result && (
        <Box mt="350px" className="text-center">
          <TappyResult result={result} device={devices[selectedDevice]} />
        </Box>
      )}
    </Container>
  );
}
