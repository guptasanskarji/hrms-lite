from sqlalchemy.orm import Session
from app import models, schemas


# =========================
# Employee CRUD
# =========================

def get_employees(db: Session):
    return db.query(models.Employee).all()


def get_employee(db: Session, employee_id: int):
    return db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()


def get_employee_by_email(db: Session, email: str):
    return db.query(models.Employee).filter(
        models.Employee.email == email
    ).first()


def create_employee(db: Session, emp: schemas.EmployeeCreate):
    employee = models.Employee(
        name=emp.name,
        email=emp.email,
        department=emp.department
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


def delete_employee(db: Session, employee_id: int):
    employee = get_employee(db, employee_id)
    if employee:
        db.delete(employee)
        db.commit()


# =========================
# Attendance CRUD
# =========================

def get_attendance(db: Session, employee_id: int):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()


def create_attendance(db: Session, att: schemas.AttendanceCreate):
    attendance = models.Attendance(
        employee_id=att.employee_id,
        date=att.date,
        status=att.status
    )
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance
