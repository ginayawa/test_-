import React from 'react';
import FormComponent from './FormComponent';

const MainForm: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">薬局問診票</h1>
      </header>
      <main className="p-4">
        <div className="container mx-auto p-6">
          <FormComponent />
        </div>
      </main>
      <footer className="bg-blue-600 text-white text-center py-4 mt-8">
        <p>© 2024 薬局問診アプリ. すべての権利を保有します。</p>
      </footer>
    </div>
  );
};

export default MainForm;
