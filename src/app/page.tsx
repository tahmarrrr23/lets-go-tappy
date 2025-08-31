"use client";

import { AnalysisForm } from "@/components/analysis-form";
import { DeviceMock } from "@/components/device-mock";
import { TappyResult } from "@/components/tappy-result";
import { devices } from "@/libs/device";
import { AnalyzeResult } from "@lycorp-jp/tappy";
import { Flex } from "@radix-ui/themes";
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
    <>
      <AnalysisForm
        url={url}
        selectedDevice={selectedDevice}
        isLoading={isLoading}
        onUrlChange={setUrl}
        onDeviceChange={setSelectedDevice}
        onExecute={handleExecute}
      />

      {selectedDevice && devices[selectedDevice] && (
        <Flex
          justify="center"
          align="center"
          width="100%"
          minHeight="calc(100vh - 74px)"
        >
          <DeviceMock device={devices[selectedDevice]}>
            {result && <TappyResult result={result} />}
          </DeviceMock>
        </Flex>
      )}
    </>
  );
}
