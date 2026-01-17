from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import models, schemas, crud
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================
# Employee Endpoints
# =========================

@app.get("/employees", response_model=list[schemas.Employee])
def list_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)


@app.post(
    "/employees",
    response_model=schemas.Employee,
    status_code=status.HTTP_201_CREATED
)
def add_employee(
    emp: schemas.EmployeeCreate,
    db: Session = Depends(get_db)
):
    # Check duplicate email
    existing = crud.get_employee_by_email(db, emp.email)
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Employee with this email already exists"
        )

    return crud.create_employee(db, emp)


@app.delete("/employees/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = crud.get_employee(db, employee_id)
    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    crud.delete_employee(db, employee_id)
    return None


# =========================
# Attendance Endpoints
# =========================
@app.get("/attendance", response_model=list[schemas.Attendance])
def list_all_attendance(db: Session = Depends(get_db)):
    return db.query(models.Attendance).all()


@app.get(
    "/attendance/{employee_id}",
    response_model=list[schemas.Attendance]
)
def list_attendance(employee_id: int, db: Session = Depends(get_db)):
    employee = crud.get_employee(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return crud.get_attendance(db, employee_id)


@app.post(
    "/attendance",
    response_model=schemas.Attendance,
    status_code=status.HTTP_201_CREATED
)
def mark_attendance(
    att: schemas.AttendanceCreate,
    db: Session = Depends(get_db)
):
    employee = crud.get_employee(db, att.employee_id)
    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return crud.create_attendance(db, att)
