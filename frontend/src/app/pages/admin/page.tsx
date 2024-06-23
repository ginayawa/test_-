'use client'

// pages/admin.tsx

import { useState } from 'react';

interface FormData {
  id: number;
  symptoms: string;
  side_effects_status: string;
  allergies_status: string;
  past_illnesses_status: string;
  combined_medications_status: string;
  difficult_medicines_status: string;
  pregnancy_status: string;
  driving: boolean;
  smoking: boolean;
  drinking: boolean;
}

const Admin: React.FC = () => {
  const [data, setData] = useState<FormData[] | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/admin/export', {
        headers: {
          'Authorization': `Bearer admin-token`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData: FormData[] = await response.json();
      console.log('Parsed JSON Data:', jsonData); // デバッグ用にパースしたJSONデータを表示
      setData(jsonData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">管理者ダッシュボード</h1>
      <div className="flex justify-center mb-6">
        <button 
          onClick={fetchData} 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
          データをエクスポート
        </button>
      </div>
      {data && (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-5 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">ID</th>
                  <th className="py-3 px-5 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Symptoms</th>
                  <th className="py-3 px-5 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Side Effects Status</th>
                  <th className="py-3 px-5 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Allergies Status</th>
                  <th className="py-3 px-5 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Past Illnesses Status</th>
                  <th className="py-3 px-5 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Combined Medications Status</th>
                  <th className="py-3 px-5 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Difficult Medicines Status</th>
                  <th className="py-3 px-5 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Pregnancy Status</th>
                  <th className="py-3 px-5 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Driving</th>
                  <th className="py-3 px-5 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Smoking</th>
                  <th className="py-3 px-5 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Drinking</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="py-3 px-5 border-b border-gray-200 text-gray-800">{row.id}</td>
                    <td className="py-3 px-5 border-b border-gray-200 text-gray-800">{row.symptoms}</td>
                    <td className="py-3 px-5 border-b border-gray-200 text-gray-800">{row.side_effects_status}</td>
                    <td className="py-3 px-5 border-b border-gray-200 text-gray-800">{row.allergies_status}</td>
                    <td className="py-3 px-5 border-b border-gray-200 text-gray-800">{row.past_illnesses_status}</td>
                    <td className="py-3 px-5 border-b border-gray-200 text-gray-800">{row.combined_medications_status}</td>
                    <td className="py-3 px-5 border-b border-gray-200 text-gray-800">{row.difficult_medicines_status}</td>
                    <td className="py-3 px-5 border-b border-gray-200 text-gray-800">{row.pregnancy_status}</td>
                    <td className="py-3 px-5 border-b border-gray-200 text-gray-800">{row.driving ? 'Yes' : 'No'}</td>
                    <td className="py-3 px-5 border-b border-gray-200 text-gray-800">{row.smoking ? 'Yes' : 'No'}</td>
                    <td className="py-3 px-5 border-b border-gray-200 text-gray-800">{row.drinking ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
