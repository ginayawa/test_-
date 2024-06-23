import React from 'react';

interface DifficultMedicine {
  type: string;
  other: string;
}

interface DifficultMedicinesComponentProps {
  difficultMedicinesStatus: string;
  difficultMedicines: DifficultMedicine[];
  handleDifficultMedicineChange: (index: number, field: string, value: string) => void;
  addDifficultMedicine: () => void;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DifficultMedicinesComponent: React.FC<DifficultMedicinesComponentProps> = ({
  difficultMedicinesStatus,
  difficultMedicines,
  handleDifficultMedicineChange,
  addDifficultMedicine,
  handleRadioChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">飲みにくい薬</h2>
      <p className="mb-4">飲みにくい薬はありますか？</p>
      <div className="mt-2">
        <label className="block mb-2">
          <input
            type="radio"
            name="difficult_medicines_status"
            value="いいえ"
            className="mr-2"
            checked={difficultMedicinesStatus === 'いいえ'}
            onChange={handleRadioChange}
          />
          いいえ
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="difficult_medicines_status"
            value="はい"
            className="mr-2"
            checked={difficultMedicinesStatus === 'はい'}
            onChange={handleRadioChange}
          />
          はい
        </label>

        {difficultMedicinesStatus === 'はい' && (
          <div>
            {difficultMedicines.map((difficultMedicine, index) => (
              <div key={index} className="mt-2">
                <select
                  value={difficultMedicine.type}
                  onChange={(e) =>
                    handleDifficultMedicineChange(index, 'type', e.target.value)
                  }
                  className="block p-2 border rounded w-full mb-2"
                >
                  <option value="">選択してください</option>
                  <option value="粉薬">粉薬</option>
                  <option value="水薬">水薬</option>
                  <option value="錠剤">錠剤</option>
                  <option value="カプセル">カプセル</option>
                  <option value="その他">その他</option>
                </select>
                {difficultMedicine.type === 'その他' && (
                  <input
                    type="text"
                    placeholder="具体的に記載してください"
                    value={difficultMedicine.other}
                    onChange={(e) =>
                      handleDifficultMedicineChange(index, 'other', e.target.value)
                    }
                    className="block mt-2 p-2 border rounded w-full"
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDifficultMedicine}
              className="mt-2 bg-blue-600 text-white py-2 px-4 rounded"
            >
              追加
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DifficultMedicinesComponent;
