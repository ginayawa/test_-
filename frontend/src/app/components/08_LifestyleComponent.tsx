import React from 'react';

interface LifestyleProps {
  driving: boolean;
  smoking: boolean;
  drinking: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LifestyleComponent: React.FC<LifestyleProps> = ({ driving, smoking, drinking, handleCheckboxChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">生活習慣</h2>
      <p className="mb-4">どのような生活を送っていますか？</p>
      <div className="mt-2">
        <label className="block mb-2">
          <input
            type="checkbox"
            name="drinking"
            checked={drinking}
            onChange={handleCheckboxChange}
          />
          飲酒 あり
        </label>
        <label className="block mb-2">
          <input
            type="checkbox"
            name="smoking"
            checked={smoking}
            onChange={handleCheckboxChange}
          />
          喫煙 あり
        </label>
        <label className="block mb-2">
          <input
            type="checkbox"
            name="driving"
            checked={driving}
            onChange={handleCheckboxChange}
          />
          運転 あり
        </label>
      </div>
    </div>
  );
}

export default LifestyleComponent;
