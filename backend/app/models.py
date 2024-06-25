from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class FormData(Base):
    __tablename__ = "form_data"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    furigana = Column(String)
    address = Column(String)
    phone = Column(String)
    gender = Column(String)
    birth_date = Column(String)  # 和暦
    weight = Column(Float)
    symptoms = Column(String)
    side_effects_status = Column(String)
    allergies_status = Column(String)
    past_illnesses_status = Column(String)
    combined_medications_status = Column(String)
    difficult_medicines_status = Column(String)
    pregnancy_status = Column(String)
    driving = Column(Boolean)
    smoking = Column(Boolean)
    drinking = Column(Boolean)
    side_effects = relationship("SideEffect", back_populates="form_data", cascade="all, delete-orphan")
    allergies = relationship("Allergy", back_populates="form_data", cascade="all, delete-orphan")
    past_illnesses = relationship("PastIllness", back_populates="form_data", cascade="all, delete-orphan")
    combined_medications = relationship("CombinedMedication", back_populates="form_data", cascade="all, delete-orphan")
    difficult_medicines = relationship("DifficultMedicine", back_populates="form_data", cascade="all, delete-orphan")

class SideEffect(Base):
    __tablename__ = "side_effects"
    id = Column(Integer, primary_key=True, index=True)
    medicine = Column(String)
    symptom = Column(String)
    form_data_id = Column(Integer, ForeignKey("form_data.id"))
    form_data = relationship("FormData", back_populates="side_effects")

class Allergy(Base):
    __tablename__ = "allergies"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    form_data_id = Column(Integer, ForeignKey("form_data.id"))
    form_data = relationship("FormData", back_populates="allergies")

class PastIllness(Base):
    __tablename__ = "past_illnesses"
    id = Column(Integer, primary_key=True, index=True)
    year = Column(String)
    disease = Column(String)
    form_data_id = Column(Integer, ForeignKey("form_data.id"))
    form_data = relationship("FormData", back_populates="past_illnesses")

class CombinedMedication(Base):
    __tablename__ = "combined_medications"
    id = Column(Integer, primary_key=True, index=True)
    medicine_name = Column(String)
    hospital_name = Column(String)
    form_data_id = Column(Integer, ForeignKey("form_data.id"))
    form_data = relationship("FormData", back_populates="combined_medications")

class DifficultMedicine(Base):
    __tablename__ = "difficult_medicines"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    other = Column(String)
    form_data_id = Column(Integer, ForeignKey("form_data.id"))
    form_data = relationship("FormData", back_populates="difficult_medicines")
