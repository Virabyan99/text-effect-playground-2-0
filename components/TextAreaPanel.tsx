// components/TextAreaPanel.tsx
import { useState } from 'react';

// components/TextAreaPanel.tsx
export function TextAreaPanel({ text, onTextChange }: { text: string; onTextChange: (text: string) => void }) {
    return (
      <div className="w-full h-full border border-gray-300 rounded p-2">
        <textarea
          value={text}
          placeholder="Type your text here..."
          className="w-full h-full"
          onChange={(event) => onTextChange(event.target.value)}
        />
      </div>
    );
  }