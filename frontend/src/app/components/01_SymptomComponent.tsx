import React from 'react';

interface SymptomsComponentProps {
  symptoms: string;
  setSymptoms: (value: string) => void;
}

const SymptomsComponent: React.FC<SymptomsComponentProps> = ({ symptoms, setSymptoms }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">原症状</h2>
      <p className="mb-4">今回はどんなことでおかかりですか？わかることを教えてください。</p>
      <textarea
        className="w-full mt-2 p-2 border rounded"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      ></textarea>
    </div>
  );
};

export default SymptomsComponent;
