import Link from "next/link";
import React from "react";
export function HeroSection() {
  return (
    <div className="w-full bg-white py-20 md:py-0 md:h-dvh flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Unlock AI-Powered</span>
              <span className="block text-blue-600">Text Processing</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
              Transform your text processing with advanced AI capabilities.
              Translate, summarize, and detect languages with unprecedented
              accuracy.
            </p>
            <div className="mt-8">
              <Link
                href="/text-processor"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg md:px-10 transform transition-transform duration-200 hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="relative lg:ml-10">
            <div className="relative w-full h-full">
              <img
                src="/illustrator.svg"
                alt="AI Text Processing Illustration"
                className="w-full h-auto max-w-lg mx-auto transform transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-50 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute -z-10 top-1/2 right-0 transform -translate-y-1/2 w-48 h-48 bg-purple-50 rounded-full filter blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
