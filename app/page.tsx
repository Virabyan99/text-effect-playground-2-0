"use client";

import { CodeEditorPanel } from '@/components/CodeEditorPanel';
import { EffectMenu } from '@/components/EffectMenu';
import { TextAreaPanel } from '@/components/TextAreaPanel';
import { TextDisplay } from '@/components/TextDisplay';
import { Button } from '@/components/ui/button';
import { useIndexedDB } from '@/hooks/useIndexedDB';
import { effects } from '@/lib/effects';
import { useEffect, useState } from 'react';
 // Adjust import based on your Shadcn UI setup

export default function Home() {
  const { data, saveData } = useIndexedDB();
  const [state, setState] = useState({ text: '', selectedEffect: 'No Effect', params: {} });
  const [activeView, setActiveView] = useState('text-effect'); // Track the active view

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

  const toggleView = () => {
    setActiveView((prevView) => (prevView === 'text-effect' ? 'code' : 'text-effect'));
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
        <div className="mt-4">
        <Button
            onClick={toggleView}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold mb-3 py-2 px-4 rounded"
          >
            {activeView === 'text-effect' ? 'Get Code' : 'Text Effect'}
          </Button>
          {/* Conditionally render TextDisplay or CodeEditorPanel */}
          {activeView === 'text-effect' ? (
            <TextDisplay
              text={state.text}
              selectedEffect={state.selectedEffect}
              params={state.params}
            />
          ) : (
            <CodeEditorPanel selectedEffect={state.selectedEffect} params={state.params} />
          )}
          {/* Button to toggle between views */}
         
        </div>
      </div>
    </div>
  );
}