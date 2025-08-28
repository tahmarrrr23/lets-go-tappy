"use client";

import {
  Container,
  Card,
  Heading,
  Flex,
  Box,
  Text,
  Separator,
} from "@radix-ui/themes";
import { useState } from "react";
import { devices } from "@/libs/device";
import { TappyResult } from "@/components/tappy-result";
import { AnalysisForm } from "@/components/analysis-form";
import { AnalyzeResult } from "@lycorp-jp/tappy";

export default function Root() {
  const [url, setUrl] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [result, setResult] = useState<
    AnalyzeResult | { error: string } | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExecute = async () => {
    if (!url || !selectedDevice) {
      setResult({
        error: "Please select a URL and device.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
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

      if (!response.ok) {
        setResult({
          error: analysisResult.error || "Analysis failed",
        });
      } else {
        setResult(analysisResult);
      }
    } catch (error) {
      setResult({
        error: `An error occurred: ${error instanceof Error ? error.message : String(error)}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="3" p="6">
      <Box mb="6">
        <Heading size="6" mb="2">
          Tappy Playground
        </Heading>
      </Box>

      <AnalysisForm
        url={url}
        selectedDevice={selectedDevice}
        isLoading={isLoading}
        onUrlChange={setUrl}
        onDeviceChange={setSelectedDevice}
        onExecute={handleExecute}
      />

      {/* Results display area */}
      {result && (
        <Box mt="6">
          {"error" in result ? (
            <Card size="3">
              <Box p="5">
                <Text color="red" weight="medium">
                  {result.error}
                </Text>
              </Box>
            </Card>
          ) : (
            <TappyResult result={result} device={devices[selectedDevice]} />
          )}
        </Box>
      )}

      {/* Loading display */}
      {isLoading && !result && (
        <Box mt="6">
          <Separator size="4" mb="4" />
          <Card size="3">
            <Box p="5">
              <Flex align="center" gap="3">
                <Text>Executing...</Text>
              </Flex>
            </Box>
          </Card>
        </Box>
      )}
    </Container>
  );
}
