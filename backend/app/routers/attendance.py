from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, database

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.get("/{employee_id}", response_model=list[schemas.Attendance])
def get_attendance(employee_id: int, db: Session = Depends(database.get_db)):
    return crud.get_attendance(db, employee_id)

@router.post("/", response_model=schemas.Attendance)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(database.get_db)):
    return crud.mark_attendance(db, attendance)
