"use client";

import React from "react";
import { Prediction } from "./ui/prediction-card";
import { NewsForm } from "./news-form";
interface PredInfo {
  confidence: string;
  model: string;
  processingTime: string;
}

interface APIResponse {
  prediction: string;
  model: string;
  qualityScore: string;
  inferenceTime: string;
}

export function NewsAnalysis() {
  const [prediction, setPrediction] = React.useState<"fake" | "factual" | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [predInfo, setPredInfo] = React.useState<PredInfo | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const API =
    process.env.NEXT_PUBLIC_API_URL ??
    "localhost:8000";
  async function getPrediction(data: { model: string; news: string }) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const results: APIResponse = await response.json();
      console.log(results);
      setPrediction(results.prediction == "Fake News" ? "fake" : "factual");
      setPredInfo({
        model: results.model,
        processingTime: results.inferenceTime,
        confidence: results.qualityScore,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Prediction error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {error ? (
        <div className="mt-10 mb-32 max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      ) : (
        <div className="mt-10 mb-32 flex flex-col align-center items-center gap-5">
          <Prediction
            prediction={prediction}
            isLoading={isLoading}
            {...predInfo}
          />
        </div>
      )}

      <div className="fixed bottom-10 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8">
        <NewsForm handleFormSubmit={getPrediction} />
      </div>
    </>
  );
}
