"use client";

import { CodeEditorPanel } from '@/components/CodeEditorPanel';
import { EffectMenu } from '@/components/EffectMenu';
import { TextAreaPanel } from '@/components/TextAreaPanel';
import { TextDisplay } from '@/components/TextDisplay';
import { Button } from '@/components/ui/button';
import { useIndexedDB } from '@/hooks/useIndexedDB';
import { effects } from '@/lib/effects';
import { useEffect, useState } from 'react';
import { getCodeWithParams } from '@/utils/codeGenerator';

export default function Home() {
  const { data, saveData } = useIndexedDB();
  const [state, setState] = useState({
    text: '',
    selectedEffect: 'No Effect',
    params: {},
    code: '',
  });
  const [activeView, setActiveView] = useState('text-effect');

  // Load data from IndexedDB when available
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

  // Handle text input changes
  const handleTextChange = (text: string) => {
    setState((prevState) => ({ ...prevState, text }));
  };

  // Handle effect selection from the menu
  const handleSelectEffect = (effect: string) => {
    const effectDef = effects.find((e) => e.name === effect);
    if (effectDef) {
      const newParams = {};
      for (const param of effectDef.paramsDefinition) {
        newParams[param.name] = param.defaultValue;
      }
      const newCode = getCodeWithParams(effectDef.codeTemplate, newParams);
      setState((prevState) => ({
        ...prevState,
        selectedEffect: effect,
        params: newParams,
        code: newCode,
      }));
    }
  };

  // Handle parameter changes from the menu
  const handleParamChange = (paramName: string, value: any) => {
    setState((prevState) => {
      const newParams = { ...prevState.params, [paramName]: value };
      const effectDef = effects.find((e) => e.name === prevState.selectedEffect);
      const newCode = getCodeWithParams(effectDef.codeTemplate, newParams);
      return {
        ...prevState,
        params: newParams,
        code: newCode,
      };
    });
  };

  // Handle code changes from CodeEditorPanel
  const handleCodeChange = (newCode) => {
    const { effectName, params } = parseCode(newCode);
    setState((prevState) => {
      const updatedEffect = effectName || prevState.selectedEffect;
      const effectDef = effects.find((e) => e.name === updatedEffect);
      return {
        ...prevState,
        code: newCode,
        selectedEffect: updatedEffect,
        params: effectDef ? { ...effectDef.paramsDefinition.reduce((acc, p) => ({ ...acc, [p.name]: p.defaultValue }), {}), ...params } : prevState.params,
      };
    });
  };

  // Toggle between text-effect and code views
  const toggleView = () => {
    if (activeView === 'code') {
      // When switching back to text view, re-parse the code to ensure params are up-to-date
      const { effectName, params } = parseCode(state.code);
      setState((prevState) => ({
        ...prevState,
        selectedEffect: effectName || prevState.selectedEffect,
        params: { ...prevState.params, ...params },
      }));
    }
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
        />
        <div className="mt-4">
          <Button
            onClick={toggleView}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold mb-3 py-2 px-4 rounded"
          >
            {activeView === 'text-effect' ? 'Get Code' : 'Text Effect'}
          </Button>
          {activeView === 'text-effect' ? (
            <TextDisplay
              text={state.text}
              selectedEffect={state.selectedEffect}
              params={state.params}
            />
          ) : (
            <CodeEditorPanel
              code={state.code}
              onCodeChange={handleCodeChange}
              selectedEffect={state.selectedEffect}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced parseCode function to extract more parameters
function parseCode(code: string): { effectName: string | null, params: Record<string, any> } {
  try {
    // Extract the effect name
    const effectNameMatch = code.match(/export default function (\w+)\(/);
    const effectName = effectNameMatch ? effectNameMatch[1] : null;

    // Initialize parameters object with optional properties
    const params: Record<string, any> = {};

    // Parse transition properties (e.g., transition={{ duration: 1.5, staggerChildren: 0.1 }})
    const transitionMatch = code.match(/transition={{([^}]+)}}/);
    if (transitionMatch) {
      const transitionProps = transitionMatch[1];
      const durationMatch = transitionProps.match(/duration:\s*(\d+\.?\d*)/);
      if (durationMatch) params.duration = parseFloat(durationMatch[1]);
      const staggerMatch = transitionProps.match(/staggerChildren:\s*(\d+\.?\d*)/);
      if (staggerMatch) params.stagger = parseFloat(staggerMatch[1]);
    }

    // Parse style properties (e.g., style={{ color: '#ff00ff', textShadow: '5px 5px 10px #00ff00' }})
    const styleMatch = code.match(/style={{([^}]+)}}/);
    if (styleMatch) {
      const styleProps = styleMatch[1];
      const colorMatch = styleProps.match(/color:\s*'([^']+)'/);
      if (colorMatch) params.color = colorMatch[1];
      const textShadowMatch = styleProps.match(/textShadow:\s*'(\d+)px (\d+)px (\d+)px (#\w+)'/);
      if (textShadowMatch) {
        params.glowStrength = parseFloat(textShadowMatch[1]);
        params.glowBlur = parseFloat(textShadowMatch[3]);
        params.glowColor = textShadowMatch[4];
      }
    }

    return { effectName, params };
  } catch (error) {
    console.error('Error parsing code:', error);
    return { effectName: null, params: {} };
  }
}