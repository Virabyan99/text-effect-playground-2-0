import { effects } from '@/lib/effects';
import { Input } from './ui/input';
import { Label } from './ui/label';


export function EffectMenu({ selectedEffect, onSelectEffect, params, onParamChange }) {
    const handleSelectChange = (event) => {
      const newEffect = event.target.value;
      onSelectEffect(newEffect);
    };
  
    const renderParams = () => {
      const effect = effects.find((e) => e.name === selectedEffect);
      if (!effect) return null;
  
      return effect.paramsDefinition.map((param) => {
        if (param.type === 'number') {
          return (
            <div key={param.name} className="mb-4">
              <Label htmlFor={param.name} className="block text-sm font-medium text-gray-700">
                {param.label}
              </Label>
              <Input
                id={param.name}
                type="number"
                value={params[param.name] ?? param.defaultValue}
                min={param.min}
                max={param.max}
                step={param.step}
                onChange={(e) => onParamChange(param.name, parseFloat(e.target.value))}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        } else if (param.type === 'color') {
          return (
            <div key={param.name} className="mb-4">
              <Label htmlFor={param.name} className="block text-sm font-medium text-gray-700">
                {param.label}
              </Label>
              <input
                id={param.name}
                type="color"
                value={params[param.name] ?? param.defaultValue}
                onChange={(e) => onParamChange(param.name, e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        }
        return null;
      });
    };
  
    return (
      <div className="mb-4">
        <select
          value={selectedEffect}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          onChange={handleSelectChange}
        >
          {effects.map((effect) => (
            <option key={effect.name} value={effect.name}>
              {effect.name}
            </option>
          ))}
        </select>
        {renderParams()}
      </div>
    );
  }
  