import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { effects } from '@/lib/effects';

export function CodeEditorPanel({ code, onCodeChange, selectedEffect }) {
  const [localCode, setLocalCode] = useState(code);
  const [copied, setCopied] = useState(false);

  // Sync local code with prop changes
  useEffect(() => {
    setLocalCode(code);
  }, [code]);

  // Handle code changes from user input
  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setLocalCode(newCode);
    onCodeChange(newCode); // Send the full code to parent
  };

  // Copy code to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(localCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  // Check if the selected effect has editable parameters
  const effectDef = effects.find((e) => e.name === selectedEffect);
  const hasParams = effectDef && effectDef.paramsDefinition.length > 0;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 p-6 rounded-lg shadow-md">
      {/* {!hasParams && (
        <p className="text-yellow-500 mb-2">
          Note: This effect has no editable parameters.
        </p>
      )} */}
      <textarea
        value={localCode}
        onChange={handleCodeChange}
        className="w-full h-96 bg-white text-gray-800 font-mono p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button
        onClick={handleCopy}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
}