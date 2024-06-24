'use client'

// pages/admin.tsx

import { useState } from 'react';
import axios from "axios";

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
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/admin/export');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData: FormData[] = await response.json();
      console.log('Parsed JSON Data:', jsonData); // デバッグ用にパースしたJSONデータを表示
      setData(jsonData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('データの取得に失敗しました');
    }
  };

  const handleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      const allIds = data ? data.map(item => item.id) : [];
      setSelectedIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleDelete = async () => {
    try {
      await axios.delete('http://localhost:8000/admin/delete', {
        data: selectedIds
      });
      if (data) {
        setData(data.filter(item => !selectedIds.includes(item.id)));
      }
      setSelectedIds([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Failed to delete data:', error);
      setError('データの削除に失敗しました');
    }
  };

  const handleExportCSV = () => {
    if (!data) return;
    const csvData = data.map(row => ({
      id: row.id,
      symptoms: row.symptoms,
      side_effects_status: row.side_effects_status,
      allergies_status: row.allergies_status,
      past_illnesses_status: row.past_illnesses_status,
      combined_medications_status: row.combined_medications_status,
      difficult_medicines_status: row.difficult_medicines_status,
      pregnancy_status: row.pregnancy_status,
      driving: row.driving ? 'Yes' : 'No',
      smoking: row.smoking ? 'Yes' : 'No',
      drinking: row.drinking ? 'Yes' : 'No'
    }));

    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(row => Object.values(row).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'data_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">管理者ダッシュボード</h1>
      <div className="flex justify-center mb-6 space-x-4">
        <button 
          onClick={fetchData} 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-full shadow-lg active:translate-y-1 active:shadow-inner transition-all duration-300"
        >
          データをエクスポート
        </button>
        <button 
          onClick={handleExportCSV} 
          disabled={!data || data.length === 0}
          className="bg-green-500 text-white py-2 px-6 ml-4 rounded-full shadow-lg active:translate-y-1 active:shadow-inner transition-all duration-300"
        >
          CSVとしてエクスポート
        </button>
        <button 
          onClick={handleDelete}
          disabled={selectedIds.length === 0}
          className="bg-red-500 text-white py-2 px-6 rounded-full shadow-lg active:translate-y-1 active:shadow-inner transition-all duration-300"
        >
          選択したデータを削除
        </button>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {data && (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full rounded-lg overflow-hidden text-xs">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-5 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="py-3 px-2 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">ID</th>
                  <th className="py-3 px-2 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Symptoms</th>
                  <th className="py-3 px-2 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Side Effects Status</th>
                  <th className="py-3 px-2 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Allergies Status</th>
                  <th className="py-3 px-2 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Past Illnesses Status</th>
                  <th className="py-3 px-2 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Combined Medications Status</th>
                  <th className="py-3 px-2 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Difficult Medicines Status</th>
                  <th className="py-3 px-2 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Pregnancy Status</th>
                  <th className="py-3 px-2 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Driving</th>
                  <th className="py-3 px-2 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Smoking</th>
                  <th className="py-3 px-2 border-b-2 border-gray-200 font-semibold text-gray-700 sticky top-0">Drinking</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="py-3 px-2 border-b border-gray-200 text-gray-800">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(row.id)}
                        onChange={() => handleSelect(row.id)}
                      />
                    </td>
                    <td className="py-3 px-2 border-b border-gray-200 text-gray-800">{row.id}</td>
                    <td className="py-3 px-2 border-b border-gray-200 text-gray-800">{row.symptoms}</td>
                    <td className="py-3 px-2 border-b border-gray-200 text-gray-800">{row.side_effects_status}</td>
                    <td className="py-3 px-2 border-b border-gray-200 text-gray-800">{row.allergies_status}</td>
                    <td className="py-3 px-2 border-b border-gray-200 text-gray-800">{row.past_illnesses_status}</td>
                    <td className="py-3 px-2 border-b border-gray-200 text-gray-800">{row.combined_medications_status}</td>
                    <td className="py-3 px-2 border-b border-gray-200 text-gray-800">{row.difficult_medicines_status}</td>
                    <td className="py-3 px-2 border-b border-gray-200 text-gray-800">{row.pregnancy_status}</td>
                    <td className="py-3 px-2 border-b border-gray-200 text-gray-800">{row.driving ? 'Yes' : 'No'}</td>
                    <td className="py-3 px-2 border-b border-gray-200 text-gray-800">{row.smoking ? 'Yes' : 'No'}</td>
                    <td className="py-3 px-2 border-b border-gray-200 text-gray-800">{row.drinking ? 'Yes' : 'No'}</td>
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
