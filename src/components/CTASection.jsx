import Link from "next/link";
import React from "react";
export function CTASection() {
  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Transform your text processing workflow with our powerful AI features.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/text-translator"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/KAYZI2HIGH/ai-text-processor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
