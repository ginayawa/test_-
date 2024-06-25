import React from 'react';

interface PersonalInfoComponentProps {
  name: string;
  furigana: string;
  address: string;
  phone: string;
  gender: string;
  birth_date: string;
  weight: string;  // weightをstringに変更
  setName: (value: string) => void;
  setFurigana: (value: string) => void;
  setAddress: (value: string) => void;
  setPhone: (value: string) => void;
  setGender: (value: string) => void;
  setBirthDate: (value: string) => void;
  setWeight: (value: string) => void;  // stringを受け取るように変更
}

const PersonalInfoComponent: React.FC<PersonalInfoComponentProps> = ({
  name, furigana, address, phone, gender, birth_date, weight,
  setName, setFurigana, setAddress, setPhone, setGender, setBirthDate, setWeight
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">個人情報</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">名前</label>
        <input
          type="text"
          className="w-full mt-2 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">フリガナ</label>
        <input
          type="text"
          className="w-full mt-2 p-2 border rounded"
          value={furigana}
          onChange={(e) => setFurigana(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">住所</label>
        <input
          type="text"
          className="w-full mt-2 p-2 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">電話番号</label>
        <input
          type="text"
          className="w-full mt-2 p-2 border rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">性別</label>
        <select
          className="w-full mt-2 p-2 border rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">選択してください</option>
          <option value="男性">男性</option>
          <option value="女性">女性</option>
          <option value="その他">その他</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">生年月日（和暦）</label>
        <input
          type="text"
          className="w-full mt-2 p-2 border rounded"
          value={birth_date}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">体重</label>
        <input
          type="number"
          step="0.1"
          className="w-full mt-2 p-2 border rounded"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PersonalInfoComponent;
