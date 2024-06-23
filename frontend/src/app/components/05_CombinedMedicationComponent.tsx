import React from 'react';

interface CombinedMedicationProps {
  combinedMedicationsStatus: string;
  combinedMedications: { medicine_name: string; hospital_name: string }[];
  handleCombinedMedicationChange: (index: number, field: string, value: string) => void;
  addCombinedMedication: () => void;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CombinedMedicationComponent: React.FC<CombinedMedicationProps> = ({
  combinedMedicationsStatus,
  combinedMedications,
  handleCombinedMedicationChange,
  addCombinedMedication,
  handleRadioChange
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">併用薬</h2>
      <p className="mb-4">今、服用している薬はありますか？</p>
      <div className="mt-2">
        <label className="block mb-2">
          <input
            type="radio"
            name="combined_medications_status"
            value="いいえ"
            className="mr-2"
            onChange={handleRadioChange}
          />
          いいえ
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="combined_medications_status"
            value="はい"
            className="mr-2"
            onChange={handleRadioChange}
          />
          はい
        </label>
        {combinedMedicationsStatus === 'はい' &&
          combinedMedications.map((medication, index) => (
            <div key={index} className="mt-4">
              <input
                type="text"
                placeholder="薬の名前"
                className="block mt-2 p-2 border rounded w-full"
                value={medication.medicine_name}
                onChange={(e) => handleCombinedMedicationChange(index, 'medicine_name', e.target.value)}
              />
              <input
                type="text"
                placeholder="病院名"
                className="block mt-2 p-2 border rounded w-full"
                value={medication.hospital_name}
                onChange={(e) => handleCombinedMedicationChange(index, 'hospital_name', e.target.value)}
              />
            </div>
          ))}
        {combinedMedicationsStatus === 'はい' && (
          <button
            type="button"
            onClick={addCombinedMedication}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
          >
            薬を追加
          </button>
        )}
      </div>
    </div>
  );
};

export default CombinedMedicationComponent;
