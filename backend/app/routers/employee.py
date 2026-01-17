from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, database

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.get("/", response_model=list[schemas.Employee])
def list_employees(db: Session = Depends(database.get_db)):
    return crud.get_employees(db)

@router.post("/", response_model=schemas.Employee)
def add_employee(employee: schemas.EmployeeCreate, db: Session = Depends(database.get_db)):
    emp = crud.create_employee(db, employee)
    if not emp:
        raise HTTPException(status_code=400, detail="Employee ID or Email already exists")
    return emp

@router.delete("/{employee_id}", response_model=schemas.Employee)
def remove_employee(employee_id: int, db: Session = Depends(database.get_db)):
    emp = crud.delete_employee(db, employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp
