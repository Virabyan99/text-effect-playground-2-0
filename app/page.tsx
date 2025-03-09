"use client";

import { CodeEditorPanel } from '@/components/CodeEditorPanel';
import { EffectMenu } from '@/components/EffectMenu';
import { TextAreaPanel } from '@/components/TextAreaPanel';
import { TextDisplay } from '@/components/TextDisplay';
import { useIndexedDB } from '@/hooks/useIndexedDB';
import { effects } from '@/lib/effects';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data, saveData } = useIndexedDB();
  const [state, setState] = useState({ text: '', selectedEffect: 'No Effect', params: {} });

  // Load data from IndexedDB when it’s available
  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  // Save to IndexedDB whenever state changes
  useEffect(() => {
    if (state) {
      saveData(state);
    }
  }, [state, saveData]);

  const handleTextChange = (text: string) => {
    setState((prevState) => ({ ...prevState, text }));
  };

  const handleSelectEffect = (effect: string) => {
    const effectDef = effects.find((e) => e.name === effect);
    if (effectDef) {
      const newParams = {};
      for (const param of effectDef.paramsDefinition) {
        newParams[param.name] = param.defaultValue;
      }
      setState((prevState) => ({ ...prevState, selectedEffect: effect, params: newParams }));
    }
  };

  const handleParamChange = (paramName: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      params: { ...prevState.params, [paramName]: value },
    }));
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4">
        <TextAreaPanel text={state.text} onTextChange={handleTextChange} />
      </div>
      <div className="w-1/2 p-4">
        <EffectMenu
          selectedEffect={state.selectedEffect}
          onSelectEffect={handleSelectEffect}
          params={state.params}
          onParamChange={handleParamChange}
        />
        <TextDisplay text={state.text} selectedEffect={state.selectedEffect} params={state.params} />
        <CodeEditorPanel selectedEffect={state.selectedEffect} params={state.params} />
      </div>
    </div>
  );
}