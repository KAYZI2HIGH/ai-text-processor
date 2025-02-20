import Link from "next/link";

export function FeatureCard({ title, description, Icon }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      <Link
        href={"https://developer.chrome.com/docs/ai/get-started"}
        className="text-blue-600 font-medium hover:text-blue-500"
      >
        Learn More →
      </Link>
    </div>
  );
}
