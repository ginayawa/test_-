import React from 'react';

interface SideEffect {
  medicine: string;
  symptom: string;
}

interface SideEffectsComponentProps {
  sideEffectsStatus: string;
  sideEffects: SideEffect[];
  handleSideEffectChange: (index: number, field: string, value: string) => void;
  addSideEffect: () => void;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SideEffectsComponent: React.FC<SideEffectsComponentProps> = ({
  sideEffectsStatus,
  sideEffects,
  handleSideEffectChange,
  addSideEffect,
  handleRadioChange
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">副作用</h2>
      <p className="mb-4">今までお薬を飲んだり、使用して副作用を起こしたことはありますか？</p>
      <div className="mt-2">
        <label className="block mb-2">
          <input
            type="radio"
            name="side_effects_status"
            value="いいえ"
            className="mr-2"
            onChange={handleRadioChange}
            checked={sideEffectsStatus === 'いいえ'}
          />
          いいえ
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="side_effects_status"
            value="はい"
            className="mr-2"
            onChange={handleRadioChange}
            checked={sideEffectsStatus === 'はい'}
          />
          はい
        </label>
      </div>
      {sideEffectsStatus === 'はい' && (
        <div>
          {sideEffects.map((sideEffect, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                placeholder="薬の名前"
                className="block mt-2 p-2 border rounded w-full"
                value={sideEffect.medicine}
                onChange={(e) => handleSideEffectChange(index, 'medicine', e.target.value)}
              />
              <input
                type="text"
                placeholder="症状"
                className="block mt-2 p-2 border rounded w-full"
                value={sideEffect.symptom}
                onChange={(e) => handleSideEffectChange(index, 'symptom', e.target.value)}
              />
            </div>
          ))}
          <button type="button" className="mt-2 p-2 bg-blue-600 text-white rounded" onClick={addSideEffect}>
            副作用を追加
          </button>
        </div>
      )}
    </div>
  );
};

export default SideEffectsComponent;
