export function TextAreaPanel({ text, onTextChange }: { text: string; onTextChange: (text: string) => void }) {
    return (
      <div className="w-full h-full border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <textarea
          value={text}
          placeholder="Type your text here..."
          className="w-full h-full text-lg p-4 bg-transparent outline-none border-none rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={(event) => onTextChange(event.target.value)}
        />
      </div>
    );
  }
