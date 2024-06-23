import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse

from app import schemas, database
from app.auth import get_password_hash, verify_password
from app.models import User, FormData, SideEffect, Allergy, PastIllness, CombinedMedication, DifficultMedicine

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
    
    access_token = "dummy-token"  # ダミートークンを返す
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/form/", response_model=schemas.FormData)
async def create_form_data(form_data: schemas.FormDataCreate, db: Session = Depends(database.get_db)):
    db_form_data = FormData(
        symptoms=form_data.symptoms,
        side_effects_status=form_data.side_effects_status,
        allergies_status=form_data.allergies_status,
        past_illnesses_status=form_data.past_illnesses_status,
        combined_medications_status=form_data.combined_medications_status,
        difficult_medicines_status=form_data.difficult_medicines_status,
        pregnancy_status=form_data.pregnancy_status,
        driving=form_data.driving,
        smoking=form_data.smoking,
        drinking=form_data.drinking,
        side_effects=[SideEffect(medicine=se.medicine, symptom=se.symptom) for se in form_data.side_effects],
        allergies=[Allergy(type=a.type) for a in form_data.allergies],
        past_illnesses=[PastIllness(year=pi.year, disease=pi.disease) for pi in form_data.past_illnesses],
        combined_medications=[CombinedMedication(medicine_name=cm.medicine_name, hospital_name=cm.hospital_name) for cm in form_data.combined_medications],
        difficult_medicines=[DifficultMedicine(type=dm.type, other=dm.other) for dm in form_data.difficult_medicines]
    )
    db.add(db_form_data)
    db.commit()
    db.refresh(db_form_data)
    return db_form_data

# その他のルート定義やAPIエンドポイントを追加

@app.get("/admin/export")
async def export_data(db: Session = Depends(database.get_db)):
    data = db.query(FormData).all()
    return JSONResponse(content=[{
        "id": d.id,
        "symptoms": d.symptoms,
        "side_effects_status": d.side_effects_status,
        "allergies_status": d.allergies_status,
        "past_illnesses_status": d.past_illnesses_status,
        "combined_medications_status": d.combined_medications_status,
        "difficult_medicines_status": d.difficult_medicines_status,
        "pregnancy_status": d.pregnancy_status,
        "driving": d.driving,
        "smoking": d.smoking,
        "drinking": d.drinking
    } for d in data])
