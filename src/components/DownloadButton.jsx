'use client'

import { Download } from 'lucide-react';
import { useAppContext } from './context';

const DownloadButton = ({ message }) => {
  const {startDownload} = useAppContext()

  return (
    <button className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
      onClick={() => {
      startDownload(message.error.action.label)
    }}
    >
      <Download className="w-4 h-4" />
      {message.error.action.label}
    </button>
  );
}

export default DownloadButton