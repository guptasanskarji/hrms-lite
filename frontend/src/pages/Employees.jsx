import { useEffect, useState } from "react";
import api from "../api/axios";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import MainLayout from "../layouts/MainLayout";
import { Button } from "react-bootstrap";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Employee fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add employee
const handleAdd = async (data) => {
  try {
    await api.post("/employees", data);
    setShowForm(false);
    fetchEmployees();
  } catch (err) {
    console.error(err);

    const message =
      err.response?.data?.detail || "Something went wrong";

    alert(message);
  }
};


  // Delete employee
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;

  try {
    await api.delete(`/employees/${id}`);
    fetchEmployees();
  } catch (err) {
    console.error(err);

    const message =
      err.response?.data?.detail || "Error deleting employee";

    alert(message);
  }
};


return (
  <MainLayout>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4>Employees</h4>
      <Button onClick={() => setShowForm(true)}>+ Add Employee</Button>
    </div>

    {loading && <Loader />}

    {!loading && employees.length === 0 && (
      <EmptyState message="No employees found. Add your first employee." />
    )}

    {!loading && employees.length > 0 && (
      <EmployeeTable employees={employees} onDelete={handleDelete} />
    )}

    <EmployeeForm
      show={showForm}
      onHide={() => setShowForm(false)}
      onSubmit={handleAdd}
    />
  </MainLayout>
);
}