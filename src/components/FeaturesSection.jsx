import React from "react";
import { Languages, FileText, Search } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
export function FeaturesSection() {
  const features = [
    {
      title: "Translation API",
      description:
        "Convert text between different languages with high accuracy and natural-sounding results.",
      Icon: Languages,
    },
    {
      title: "Summarization API",
      description:
        "Generate concise summaries of long texts while maintaining key information and context.",
      Icon: FileText,
    },
    {
      title: "Language Detection API",
      description:
        "Automatically identify the language of any input text with precise accuracy.",
      Icon: Search,
    },
  ];
  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
