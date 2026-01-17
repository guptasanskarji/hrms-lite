from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models, schemas, crud

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Employee Endpoints
@app.get("/employees", response_model=list[schemas.Employee])
def list_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)

@app.post("/employees", response_model=schemas.Employee)
def add_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db, emp)

@app.delete("/employees/{employee_id}")
def remove_employee(employee_id: int, db: Session = Depends(get_db)):
    return crud.delete_employee(db, employee_id)

# Attendance Endpoints
@app.get("/attendance/{employee_id}", response_model=list[schemas.Attendance])
def list_attendance(employee_id: int, db: Session = Depends(get_db)):
    return crud.get_attendance(db, employee_id)

@app.post("/attendance", response_model=schemas.Attendance)
def mark_attendance(att: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    return crud.create_attendance(db, att)
