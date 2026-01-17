from pydantic import BaseModel, EmailStr
from datetime import date

# Employee Schemas
class EmployeeBase(BaseModel):
    name: str
    email: EmailStr
    department: str

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int
    class Config:
        orm_mode = True

# Attendance Schemas
class AttendanceBase(BaseModel):
    employee_id: int
    date: date
    status: str

class AttendanceCreate(AttendanceBase):
    pass

class Attendance(AttendanceBase):
    id: int
    employee: Employee
    class Config:
        orm_mode = True
