
import { effects } from "@/lib/effects";
import { getCodeWithParams } from "@/utils/codeGenerator";


export function CodeEditorPanel({ selectedEffect, params }) {
  const effect = effects.find(e => e.name === selectedEffect);
  if (!effect) return <pre>Effect not found</pre>;

  const code = getCodeWithParams(effect.codeTemplate, params);
  return <pre className="bg-gray-100 p-4 rounded">{code}</pre>;
}