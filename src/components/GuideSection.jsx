'use client'
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
const guideSteps = [
  {
    title: "Requirements",
    content:
      "• Chrome Dev or Chrome Canary (Version 128.0.6545.0 or newer)\n• At least 22 GB of free storage",
  },
  {
    title: "Enable Chrome Flags",
    content:
      "1. Open Chrome Dev or Canary\n2. Go to chrome://flags\n3. Enable: Language Detection API, Translation API, and Summarization API\n4. Restart Chrome",
  },
  {
    title: "Allow AI Models to Download",
    content:
      "• Open Developer Tools\n• Check Console for download progress\n• Wait for the 22 GB download to complete",
  },
  {
    title: "Using the Features",
    content:
      "Simply enter text and select the AI feature you want to use:\n• Translation\n• Summarization\n• Language Detection",
  },
  {
    title: "Mobile Support",
    content:
      "• Install Chrome Canary from Play Store\n• Enable flags as described above\n• Note: Downloads may be slower on mobile",
  },
];
export function GuideSection() {
  const [openStep, setOpenStep] = useState();
  return (
    <div className="w-full bg-white py-16" id="guides">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Quick Start Guide
        </h2>
        <div className="space-y-4">
          {guideSteps.map((step, index) => (
            <div
              key={index}
              className="border rounded-lg"
            >
              <button
                className="w-full px-4 py-3 flex justify-between items-center text-left"
                onClick={() => setOpenStep(openStep === index ? null : index)}
              >
                <span className="font-medium text-gray-900">
                  {index + 1}. {step.title}
                </span>
                {openStep === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openStep === index && (
                <div className="px-4 pb-4 text-gray-600 whitespace-pre-line">
                  {step.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
