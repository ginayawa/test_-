from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class SideEffectBase(BaseModel):
    medicine: str
    symptom: str

class SideEffectCreate(SideEffectBase):
    pass

class SideEffect(SideEffectBase):
    id: int
    form_data_id: int

    class Config:
        from_attributes = True

class AllergyBase(BaseModel):
    type: str

class AllergyCreate(AllergyBase):
    pass

class Allergy(AllergyBase):
    id: int
    form_data_id: int

    class Config:
        from_attributes = True

class PastIllnessBase(BaseModel):
    year: str
    disease: str

class PastIllnessCreate(PastIllnessBase):
    pass

class PastIllness(PastIllnessBase):
    id: int
    form_data_id: int

    class Config:
        from_attributes = True

class CombinedMedicationBase(BaseModel):
    medicine_name: str
    hospital_name: str

class CombinedMedicationCreate(CombinedMedicationBase):
    pass

class CombinedMedication(CombinedMedicationBase):
    id: int
    form_data_id: int

    class Config:
        from_attributes = True

class DifficultMedicineBase(BaseModel):
    type: str
    other: Optional[str] = None

class DifficultMedicineCreate(DifficultMedicineBase):
    pass

class DifficultMedicine(DifficultMedicineBase):
    id: int
    form_data_id: int

    class Config:
        from_attributes = True

class FormDataBase(BaseModel):
    name: str
    furigana: str
    address: str
    phone: str
    gender: str
    birth_date: str  # 和暦
    weight: Optional[float] = None  # weightフィールドをOptionalに変更
    symptoms: str
    side_effects_status: str
    allergies_status: str
    past_illnesses_status: str
    combined_medications_status: str
    difficult_medicines_status: str
    pregnancy_status: str
    driving: bool
    smoking: bool
    drinking: bool

class FormDataCreate(FormDataBase):
    side_effects: List[SideEffectCreate]
    allergies: List[AllergyCreate]
    past_illnesses: List[PastIllnessCreate]
    combined_medications: List[CombinedMedicationCreate]
    difficult_medicines: List[DifficultMedicineCreate]

class FormData(FormDataBase):
    id: int
    side_effects: List[SideEffect]
    allergies: List[Allergy]
    past_illnesses: List[PastIllness]
    combined_medications: List[CombinedMedication]
    difficult_medicines: List[DifficultMedicine]

    class Config:
        from_attributes = True
