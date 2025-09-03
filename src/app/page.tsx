"use client";

import type { AnalyzeResult } from "@lycorp-jp/tappy";
import { Flex, Spinner } from "@radix-ui/themes";
import { useState } from "react";
import { AnalysisForm } from "@/components/analysis-form";
import { AnalysisResult } from "@/components/analysis-result";
import { DeviceMock } from "@/components/device-mock";
import { devices } from "@/libs/device";

export default function Root() {
  const [url, setUrl] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("VGA");
  const [wait, setWait] = useState(1000);
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
        wait,
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
        wait={wait}
        isLoading={isLoading}
        onUrlChange={setUrl}
        onDeviceChange={setSelectedDevice}
        onWaitChange={setWait}
        onExecute={handleExecute}
      />

      <Flex
        justify="center"
        align="center"
        width="100%"
        minHeight="calc(100vh - 72px)"
      >
        <DeviceMock device={devices[selectedDevice]}>
          {isLoading && (
            <Flex justify="center" align="center" height="100%">
              <Spinner />
            </Flex>
          )}
          {result && <AnalysisResult result={result} />}
        </DeviceMock>
      </Flex>
    </>
  );
}
