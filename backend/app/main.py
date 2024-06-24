import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from app.crypto import encrypt_data, decrypt_data
from app import schemas, database
from app.auth import get_password_hash, verify_password
from app.models import User, FormData, SideEffect, Allergy, PastIllness, CombinedMedication, DifficultMedicine
from datetime import datetime, timedelta
from typing import List, Optional

app = FastAPI()

# CORS設定を追加
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # 他の許可するオリジンをここに追加
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# データベースの初期化をここで行う
database.Base.metadata.create_all(bind=database.engine)

# ユーザー登録エンドポイント
@app.post("/register")
def register_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# ログインエンドポイント
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    return {"message": "Login successful"}

@app.post("/form/", response_model=schemas.FormData)
async def create_form_data(form_data: schemas.FormDataCreate, db: Session = Depends(database.get_db)):
    db_form_data = FormData(
        symptoms= encrypt_data(form_data.symptoms) ,  # 暗号化されたデータを保存
        side_effects_status=encrypt_data(form_data.side_effects_status),
        allergies_status=encrypt_data(form_data.allergies_status),
        past_illnesses_status=encrypt_data(form_data.past_illnesses_status),
        combined_medications_status=encrypt_data(form_data.combined_medications_status),
        difficult_medicines_status=encrypt_data(form_data.difficult_medicines_status),
        pregnancy_status=encrypt_data(form_data.pregnancy_status),
        driving=form_data.driving,  # ブール値はそのまま保存
        smoking=form_data.smoking,  # ブール値はそのまま保存
        drinking=form_data.drinking  # ブール値はそのまま保存
    )
    
    for se in form_data.side_effects:
        db_form_data.side_effects.append(SideEffect(medicine=encrypt_data(se.medicine), symptom=encrypt_data(se.symptom)))
    for a in form_data.allergies:
        db_form_data.allergies.append(Allergy(type=encrypt_data(a.type)))
    for pi in form_data.past_illnesses:
        db_form_data.past_illnesses.append(PastIllness(year=encrypt_data(pi.year), disease=encrypt_data(pi.disease)))
    for cm in form_data.combined_medications:
        db_form_data.combined_medications.append(CombinedMedication(medicine_name=encrypt_data(cm.medicine_name), hospital_name=encrypt_data(cm.hospital_name)))
    for dm in form_data.difficult_medicines:
        db_form_data.difficult_medicines.append(DifficultMedicine(type=encrypt_data(dm.type), other=encrypt_data(dm.other)))

    db.add(db_form_data)
    db.commit()
    db.refresh(db_form_data)
    return db_form_data

@app.get("/admin/export")
async def export_data(db: Session = Depends(database.get_db)):
    data = db.query(FormData).all()
    decrypted_data = []
    try:
        for d in data:
            decrypted_data.append({
                "id": d.id,
                "symptoms": decrypt_data(d.symptoms),
                "side_effects_status": decrypt_data(d.side_effects_status),
                "allergies_status": decrypt_data(d.allergies_status),
                "past_illnesses_status": decrypt_data(d.past_illnesses_status),
                "combined_medications_status": decrypt_data(d.combined_medications_status),
                "difficult_medicines_status": decrypt_data(d.difficult_medicines_status),
                "pregnancy_status": decrypt_data(d.pregnancy_status),
                "driving": d.driving,
                "smoking": d.smoking,
                "drinking": d.drinking
            })
    except Exception as e:
        # エラーメッセージをログに記録
        print(f"Error processing data: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}")

    return JSONResponse(content=decrypted_data)

# データ削除エンドポイント
@app.delete("/admin/delete", response_model=List[schemas.FormData])
def delete_form_data(form_ids: List[int], db: Session = Depends(database.get_db)):
    deleted_forms = []
    for form_id in form_ids:
        form_data = db.query(FormData).filter(FormData.id == form_id).first()
        if form_data:
            # 先に関連するデータを削除
            db.query(SideEffect).filter(SideEffect.form_data_id == form_data.id).delete()
            db.query(Allergy).filter(Allergy.form_data_id == form_data.id).delete()
            db.query(PastIllness).filter(PastIllness.form_data_id == form_data.id).delete()
            db.query(CombinedMedication).filter(CombinedMedication.form_data_id == form_data.id).delete()
            db.query(DifficultMedicine).filter(DifficultMedicine.form_data_id == form_data.id).delete()
            db.delete(form_data)
            deleted_forms.append(form_data)
    db.commit()
    return deleted_forms
