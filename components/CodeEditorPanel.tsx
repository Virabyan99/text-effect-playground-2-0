import { useState } from 'react';
import { effects } from "@/lib/effects";
import { getCodeWithParams } from "@/utils/codeGenerator";
import { Button } from './ui/button';
 // Adjust import based on your Shadcn UI setup

export function CodeEditorPanel({ selectedEffect, params }) {
  const effect = effects.find(e => e.name === selectedEffect);
  if (!effect) return <pre className="text-red-500">Effect not found</pre>;

  const code = getCodeWithParams(effect.codeTemplate, params);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg shadow-md">
      <pre className="overflow-auto max-h-96 text-gray-800 font-mono mb-4">
        {code}
      </pre>
      <Button
        onClick={handleCopy}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
}