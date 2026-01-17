# HRMS Lite

## Project Overview
HRMS Lite is a lightweight Human Resource Management System designed to manage employee information and attendance efficiently.  
It provides a simple, intuitive interface for tracking employees and their daily attendance while demonstrating a full-stack deployment using modern technologies.

**Key Features:**
- Employee management (CRUD operations)
- Attendance tracking
- API-driven architecture
- Live deployment with backend and frontend connected
- Swagger UI for testing API endpoints

---

## Tech Stack Used

**Frontend:**
- React.js
- Axios (API requests)
- React Router DOM

**Backend:**
- Python 3.13
- FastAPI
- SQLAlchemy (ORM)
- Pydantic (Data validation)
- Uvicorn (ASGI server)
- SQLite / PostgreSQL (Database)

**Deployment:**
- Backend: Render
- Frontend: Vercel
- Version Control: GitHub

---

## Live URLs
- **Frontend:** [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)  
- **Backend:** [https://hrms-lite-68ca.onrender.com](https://hrms-lite-68ca.onrender.com)  

---

## Steps to Run the Project Locally

### Backend
1. Navigate to the backend folder:
    cd backend
2. Create and activate a virtual environment:

python -m venv venv
venv\Scripts\activate    # Windows

3. Install dependencies:

pip install -r requirements.txt

4. Run the server:

uvicorn app.main:app --reload

5. Access the API docs at http://127.0.0.1:8000/docs

Frontend

1. Navigate to the frontend folder:

cd frontend


2. Install dependencies:

npm install


3. Start the development server:

npm start


4. Open http://localhost:3000
 to view the frontend.
