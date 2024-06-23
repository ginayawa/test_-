import React, { useState } from 'react';

interface PregnancyComponentProps {
  pregnancyStatus: string;
  setPregnancyStatus: (value: string) => void;
}

const PregnancyComponent: React.FC<PregnancyComponentProps> = ({ pregnancyStatus, setPregnancyStatus }) => {
  const [pregnancyWeeks, setPregnancyWeeks] = useState('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPregnancyStatus(event.target.value);
    if (event.target.value !== 'はい') {
      setPregnancyWeeks('');
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPregnancyWeeks(event.target.value);
    setPregnancyStatus(`はい (${event.target.value}週目)`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">※女性の方へ</h2>
      <p className="mb-4">現在、妊娠中あるいは妊娠の可能性、または授乳中ですか？</p>
      <div className="mt-2">
        <label className="block mb-2">
          <input
            type="radio"
            name="pregnancy_status"
            value="いいえ"
            checked={pregnancyStatus === 'いいえ'}
            className="mr-2"
            onChange={handleRadioChange}
          />
          いいえ
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="pregnancy_status"
            value="はい"
            checked={pregnancyStatus.startsWith('はい')}
            className="mr-2"
            onChange={handleRadioChange}
          />
          はい
        </label>
        {pregnancyStatus.startsWith('はい') && (
          <input
            type="text"
            value={pregnancyWeeks}
            placeholder="妊娠中（週目）"
            className="block mt-2 p-2 border rounded w-full"
            onChange={handleTextChange}
          />
        )}
        <label className="block mb-2">
          <input
            type="radio"
            name="pregnancy_status"
            value="妊娠の可能性あり"
            checked={pregnancyStatus === '妊娠の可能性あり'}
            className="mr-2"
            onChange={handleRadioChange}
          />
          妊娠の可能性あり
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="pregnancy_status"
            value="授乳中"
            checked={pregnancyStatus === '授乳中'}
            className="mr-2"
            onChange={handleRadioChange}
          />
          授乳中
        </label>
      </div>
    </div>
  );
};

export default PregnancyComponent;
