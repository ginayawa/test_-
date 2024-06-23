import React from 'react';

interface PastIllness {
  year: string;
  disease: string;
}

interface PastIllnessesComponentProps {
  pastIllnessesStatus: string;
  pastIllnesses: PastIllness[];
  handlePastIllnessChange: (index: number, field: string, value: string) => void;
  addPastIllness: () => void;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PastIllnessesComponent: React.FC<PastIllnessesComponentProps> = ({
  pastIllnessesStatus,
  pastIllnesses,
  handlePastIllnessChange,
  addPastIllness,
  handleRadioChange
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">既往歴</h2>
      <p className="mb-4">今までにかかったことがある大きな病気はありますか？</p>
      <div className="mt-2">
        <label className="block mb-2">
          <input
            type="radio"
            name="past_illnesses_status"
            value="いいえ"
            className="mr-2"
            onChange={handleRadioChange}
            checked={pastIllnessesStatus === 'いいえ'}
          />
          いいえ
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="past_illnesses_status"
            value="はい"
            className="mr-2"
            onChange={handleRadioChange}
            checked={pastIllnessesStatus === 'はい'}
          />
          はい
        </label>
      </div>
      {pastIllnessesStatus === 'はい' && (
        <div>
          {pastIllnesses.map((illness, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                placeholder="何年ごろ"
                className="block mt-2 p-2 border rounded w-full"
                value={illness.year}
                onChange={(e) => handlePastIllnessChange(index, 'year', e.target.value)}
              />
              <input
                type="text"
                placeholder="疾患名"
                className="block mt-2 p-2 border rounded w-full"
                value={illness.disease}
                onChange={(e) => handlePastIllnessChange(index, 'disease', e.target.value)}
              />
            </div>
          ))}
          <button type="button" className="mt-2 p-2 bg-blue-600 text-white rounded" onClick={addPastIllness}>
            既往歴を追加
          </button>
        </div>
      )}
    </div>
  );
};

export default PastIllnessesComponent;
