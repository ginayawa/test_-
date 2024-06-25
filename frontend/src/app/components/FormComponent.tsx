import React, { useState } from 'react';

import PersonalInfoComponent from './00_PersonalInfoComponent'
import SymptomsComponent from './01_SymptomComponent';
import SideEffectsComponent from './02_SideEffectsComponent';
import AllergiesComponent from './03_AllergiesComponent';
import PastIllnessesComponent from './04_PastIllnessesComponent';
import CombinedMedicationComponent from './05_CombinedMedicationComponent';
import DifficultMedicinesComponent from './06_DifficultMedicinesComponent';
import PregnancyComponent from './07_PregnancyComponent';
import LifestyleComponent from './08_LifestyleComponent';

interface FormData {
  name: string;
  furigana: string;
  address: string;
  phone: string;
  gender: string;
  birth_date: string;  // 和暦
  weight: string;
  symptoms: string;
  side_effects_status: string;
  side_effects: { medicine: string; symptom: string }[];
  allergies_status: string;
  allergies: { type: string }[];
  past_illnesses_status: string;
  past_illnesses: { year: string; disease: string }[];
  combined_medications_status: string;
  combined_medications: { medicine_name: string; hospital_name: string }[];
  difficult_medicines_status: string;
  difficult_medicines: { type: string; other: string }[];
  pregnancy_status: string;
  driving: boolean;
  smoking: boolean;
  drinking: boolean;
}

export default function FormComponent() {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    furigana: '',
    address: '',
    phone: '',
    gender: '',
    birth_date: '',
    weight: '',
    symptoms: '',
    side_effects_status: 'いいえ',
    side_effects: [{ medicine: '', symptom: '' }],
    allergies_status: 'いいえ',
    allergies: [{ type: '' }],
    past_illnesses_status: 'いいえ',
    past_illnesses: [{ year: '', disease: '' }],
    combined_medications_status: '',
    combined_medications: [{ medicine_name: '', hospital_name: '' }],
    difficult_medicines_status: 'いいえ',
    difficult_medicines: [{ type: '', other: '' }],
    pregnancy_status: '',
    driving: false,
    smoking: false,
    drinking: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const parsedWeight = formData.weight === '' ? null : parseFloat(formData.weight);
  
      const parsedFormData = {
        ...formData,
        weight: parsedWeight,  // weightをnullまたは数値に設定
      };
  
      const response = await fetch('http://localhost:8000/form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedFormData)
      });
      if (response.ok) {
        alert('Data saved successfully');
      } else {
        const errorData = await response.json();
        console.error("Error response:", response, errorData);
        alert('Error saving data');
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert('Error saving data');
    }
  };
  

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSideEffectChange = (index: number, field: string, value: string) => {
    const newSideEffects = [...formData.side_effects];
    newSideEffects[index] = { ...newSideEffects[index], [field]: value };
    setFormData({ ...formData, side_effects: newSideEffects });
  };

  const addSideEffect = () => {
    setFormData({
      ...formData,
      side_effects: [...formData.side_effects, { medicine: '', symptom: '' }]
    });
  };

  const handleAllergyChange = (index: number, field: string, value: string) => {
    const newAllergies = [...formData.allergies];
    newAllergies[index] = { ...newAllergies[index], [field]: value };
    setFormData({ ...formData, allergies: newAllergies });
  };

  const addAllergy = () => {
    setFormData({
      ...formData,
      allergies: [...formData.allergies, { type: '' }]
    });
  };

  const handlePastIllnessChange = (index: number, field: string, value: string) => {
    const newPastIllnesses = [...formData.past_illnesses];
    newPastIllnesses[index] = { ...newPastIllnesses[index], [field]: value };
    setFormData({ ...formData, past_illnesses: newPastIllnesses });
  };

  const addPastIllness = () => {
    setFormData({
      ...formData,
      past_illnesses: [...formData.past_illnesses, { year: '', disease: '' }]
    });
  };

  const handleCombinedMedicationChange = (index: number, field: string, value: string) => {
    const newCombinedMedications = [...formData.combined_medications];
    newCombinedMedications[index] = { ...newCombinedMedications[index], [field]: value };
    setFormData({ ...formData, combined_medications: newCombinedMedications });
  };

  const addCombinedMedication = () => {
    setFormData({
      ...formData,
      combined_medications: [...formData.combined_medications, { medicine_name: '', hospital_name: '' }]
    });
  };

  const handleDifficultMedicineChange = (index: number, field: string, value: string) => {
    const newDifficultMedicines = [...formData.difficult_medicines];
    newDifficultMedicines[index] = { ...newDifficultMedicines[index], [field]: value };
    setFormData({ ...formData, difficult_medicines: newDifficultMedicines });
  };

  const addDifficultMedicine = () => {
    setFormData({
      ...formData,
      difficult_medicines: [...formData.difficult_medicines, { type: '', other: '' }]
    });
  };

  const handlePregnancyStatusChange = (value: string) => {
    setFormData({ ...formData, pregnancy_status: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 患者情報 */}
      <PersonalInfoComponent
        name={formData.name}
        furigana={formData.furigana}
        address={formData.address}
        phone={formData.phone}
        gender={formData.gender}
        birth_date={formData.birth_date}
        weight={formData.weight}
        setName={(value: string) => setFormData({ ...formData, name: value })}
        setFurigana={(value: string) => setFormData({ ...formData, furigana: value })}
        setAddress={(value: string) => setFormData({ ...formData, address: value })}
        setPhone={(value: string) => setFormData({ ...formData, phone: value })}
        setGender={(value: string) => setFormData({ ...formData, gender: value })}
        setBirthDate={(value: string) => setFormData({ ...formData, birth_date: value })}
        setWeight={(value: string) => setFormData({ ...formData, weight: value })}
      />

      
      {/* 原疾患 */}
      <SymptomsComponent
        symptoms={formData.symptoms}
        setSymptoms={(value: string) => setFormData({ ...formData, symptoms: value })}
      />

      {/* 副作用 */}
      <SideEffectsComponent
        sideEffectsStatus={formData.side_effects_status}
        sideEffects={formData.side_effects}
        handleSideEffectChange={handleSideEffectChange}
        addSideEffect={addSideEffect}
        handleRadioChange={handleRadioChange}
      />

      {/* アレルギー */}
      <AllergiesComponent
        allergiesStatus={formData.allergies_status}
        allergies={formData.allergies}
        handleAllergyChange={handleAllergyChange}
        addAllergy={addAllergy}
        handleRadioChange={handleRadioChange}
      />

      {/*```tsx
      {/* 既往歴 */}
      <PastIllnessesComponent
        pastIllnessesStatus={formData.past_illnesses_status}
        pastIllnesses={formData.past_illnesses}
        handlePastIllnessChange={handlePastIllnessChange}
        addPastIllness={addPastIllness}
        handleRadioChange={handleRadioChange}
      />

      {/* 併用薬 */}
      <CombinedMedicationComponent
        combinedMedicationsStatus={formData.combined_medications_status}
        combinedMedications={formData.combined_medications}
        handleCombinedMedicationChange={handleCombinedMedicationChange}
        addCombinedMedication={addCombinedMedication}
        handleRadioChange={handleRadioChange}
      />

      {/* 飲みにくい薬 */}
      <DifficultMedicinesComponent
        difficultMedicinesStatus={formData.difficult_medicines_status}
        difficultMedicines={formData.difficult_medicines}
        handleDifficultMedicineChange={handleDifficultMedicineChange}
        addDifficultMedicine={addDifficultMedicine}
        handleRadioChange={handleRadioChange}
      />

      {/* 女性の方へ */}
      <PregnancyComponent
        pregnancyStatus={formData.pregnancy_status}
        setPregnancyStatus={handlePregnancyStatusChange}
      />

      {/* 生活習慣 */}
      <LifestyleComponent
        driving={formData.driving}
        smoking={formData.smoking}
        drinking={formData.drinking}
        handleCheckboxChange={handleCheckboxChange}
      />
      
      <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-full shadow-lg active:translate-y-1 active:shadow-inner transition-all duration-300">送信</button>

    </form>
  );
}
