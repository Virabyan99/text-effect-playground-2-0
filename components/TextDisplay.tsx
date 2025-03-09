// components/TextDisplay.tsx

import { effects } from "@/lib/effects";



export function TextDisplay({ text, selectedEffect, params }) {
  const effect = effects.find(e => e.name === selectedEffect);
  if (!effect) return <div>Effect not found</div>;

  const Component = effect.component;
  return <Component text={text} params={params} />;
}