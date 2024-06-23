import React from 'react';

interface Allergy {
  type: string;
}

interface AllergiesComponentProps {
  allergiesStatus: string;
  allergies: Allergy[];
  handleAllergyChange: (index: number, field: string, value: string) => void;
  addAllergy: () => void;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AllergiesComponent: React.FC<AllergiesComponentProps> = ({
  allergiesStatus,
  allergies,
  handleAllergyChange,
  addAllergy,
  handleRadioChange
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">アレルギー</h2>
      <p className="mb-4">アレルギーはありますか？</p>
      <div className="mt-2">
        <label className="block mb-2">
          <input
            type="radio"
            name="allergies_status"
            value="いいえ"
            className="mr-2"
            onChange={handleRadioChange}
            checked={allergiesStatus === 'いいえ'}
          />
          いいえ
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="allergies_status"
            value="はい"
            className="mr-2"
            onChange={handleRadioChange}
            checked={allergiesStatus === 'はい'}
          />
          はい
        </label>
      </div>
      {allergiesStatus === 'はい' && (
        <div>
          {allergies.map((allergy, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                placeholder="アレルギーの種類"
                className="block mt-2 p-2 border rounded w-full"
                value={allergy.type}
                onChange={(e) => handleAllergyChange(index, 'type', e.target.value)}
              />
            </div>
          ))}
          <button type="button" className="mt-2 p-2 bg-blue-600 text-white rounded" onClick={addAllergy}>
            アレルギーを追加
          </button>
        </div>
      )}
    </div>
  );
};

export default AllergiesComponent;
