import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

type PredictionType = "fake" | "factual" | null;

interface PredictionProps extends AdditionalInfoProps {
  prediction: PredictionType;
  isLoading: boolean;
}

interface LoaderProps {
  message?: string;
  className?: string;
}

interface PredictionResultsProps extends AdditionalInfoProps {
  predictedOutput: PredictionType;
}

interface AdditionalInfoProps {
  confidence?: string;
  model?: string;
  processingTime?: string;
}

const PREDICTION_CONFIG = {
  factual: {
    result: "Real News",
    message: "This appears to be legitimate news",
    icon: CheckCircle2,
  },
  fake: {
    result: "Fake News",
    message: "This appears to be misleading",
    icon: XCircle,
  },
} as const;

export function Prediction({ prediction, isLoading, confidence, model, processingTime }: PredictionProps) {
  return (
    <Card className="max-w-2xl w-full border-none shadow-none p-4 px-6 min-h-40 md:min-h-[200px] flex items-center justify-center bg-blue-400/10 text-[#b2afaf]">
      {isLoading ? (
        <Loader message="Analyzing news..." />
      ) : (
        <PredictionResults
          predictedOutput={prediction}
          confidence={confidence}
          model={model}
          processingTime={processingTime}
        />
      )}
    </Card>
  );
}

export function Loader({ message = "", className = "" }: LoaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
      <Loader2
        className={`w-16 h-16 text-[#ff8747] animate-spin ${className}`}
      />
      {message && <p className="text-white text-lg">{message}</p>}
    </div>
  );
}

function PredictionResults({ predictedOutput, confidence, model, processingTime }: PredictionResultsProps) {

    const details = [
      { label: "Confidence Level", value: confidence ?? null },
      { label: "Model Used", value: model ?? null },
      { label: "Processing Time", value: processingTime ?? null },
    ];


  if (!predictedOutput) {
    return (
      <div className="text-center space-y-2 animate-in fade-in duration-300">
        <p className="text-md md:text-lg">No prediction yet</p>
        <p className="text-sm">Submit news to see results</p>
      </div>
    );
  }

  const config = PREDICTION_CONFIG[predictedOutput];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 fade-in duration-400 ">
      <div className="relative">
        <div
          className={`absolute inset-0 rounded-full opacity-30 animate-pulse`}
        />
        <Icon
          className={`w-15 h-15  relative animate-in zoom-in duration-600`}
          strokeWidth={2.5}
        />
      </div>
      <div className="text-center space-y-2 animate-in slide-in-from-bottom-4 fade-in duration-600 delay-100">
        <h3 className={`text-2xl font-bold `}>{config.result}</h3>
        <p className="text-sm">{config.message}</p>
      </div>
      <div className="space-y-2 text-xs flex gap-3 md:gap-5 justify-between w-full mt-4">
        {details.map(({ label, value }) => (
          <span className="font-medium" key={label}>
            {label}: {value}
          </span>
        ))}
      </div>
    </div>
  );
}
