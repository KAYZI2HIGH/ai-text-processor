'use client'

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-3xl text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text font-bold">
              TextAI
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/text-processor"
                className="text-gray-600 hover:text-gray-900 px-3 py-2"
              >
                App
              </Link>
              <Link
                href="#guides"
                scroll={true}
                className="text-gray-600 hover:text-gray-900 px-3 py-2"
              >
                Guide
              </Link>
              <Link
                href="https://developer.chrome.com/docs/ai/get-started"
                className="text-gray-600 hover:text-gray-900 px-3 py-2"
              >
                Support
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/text-processor"
              className="block text-gray-600 hover:text-gray-900 px-3 py-2"
            >
              App
            </Link>
            <Link
              href="#guides"
              className="block text-gray-600 hover:text-gray-900 px-3 py-2"
            >
              Guide
            </Link>
            <Link
              href="https://developer.chrome.com/docs/ai/get-started"
              className="block text-gray-600 hover:text-gray-900 px-3 py-2"
            >
              Support
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
