import { effects } from "@/lib/effects";

export function TextDisplay({ text, selectedEffect, params }) {
  const effect = effects.find(e => e.name === selectedEffect);
  if (!effect) return <div className="text-red-500">Effect not found</div>;

  const Component = effect.component;
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-300 shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 w-full">
      <Component text={text} params={params} />
    </div>
  );
}