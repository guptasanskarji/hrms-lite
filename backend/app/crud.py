from sqlalchemy.orm import Session
from models import Employee, Attendance
from schemas import EmployeeCreate, AttendanceCreate
from fastapi import HTTPException, status
from datetime import date

# Employees
def get_employees(db: Session):
    return db.query(Employee).all()

def get_employee(db: Session, employee_id: int):
    return db.query(Employee).filter(Employee.id == employee_id).first()

def create_employee(db: Session, emp: EmployeeCreate):
    existing = db.query(Employee).filter(Employee.email == emp.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Employee with this email already exists")
    db_emp = Employee(**emp.dict())
    db.add(db_emp)
    db.commit()
    db.refresh(db_emp)
    return db_emp

def delete_employee(db: Session, employee_id: int):
    emp = get_employee(db, employee_id)
    if not emp:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    db.delete(emp)
    db.commit()
    return {"detail": "Employee deleted"}

# Attendance
def get_attendance(db: Session, employee_id: int):
    return db.query(Attendance).filter(Attendance.employee_id == employee_id).all()

def create_attendance(db: Session, att: AttendanceCreate):
    db_att = Attendance(**att.dict())
    db.add(db_att)
    db.commit()
    db.refresh(db_att)
    return db_att
