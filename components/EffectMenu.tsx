import { effects } from '@/lib/effects';

export function EffectMenu({ selectedEffect, onSelectEffect }) {
  const handleSelectChange = (event) => {
    const newEffect = event.target.value;
    onSelectEffect(newEffect);
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
    </div>
  );
}
