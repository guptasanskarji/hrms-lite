import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import { Button, Table } from "react-bootstrap";
import AttendanceForm from "../components/AttendanceForm";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const fetchEmployees = async () => {
    try { const res = await api.get("/employees"); setEmployees(res.data); } 
    catch (err) { console.error(err); }
  };

  const fetchAttendance = async (employeeId) => {
    if (!employeeId) return;
    setLoading(true);
    try {
      const res = await api.get(`/attendance/${Number(employeeId)}`);
      setAttendance(res.data);
      setSelectedEmployee(Number(employeeId));
    } catch (err) {
      console.error(err);
      setAttendance([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleMarkAttendance = async (data) => {
    try { await api.post("/attendance", data); setShowForm(false); fetchAttendance(data.employee_id); } 
    catch (err) { alert("Error marking attendance"); }
  };

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Attendance</h4>
        <Button onClick={() => setShowForm(true)}>+ Mark Attendance</Button>
      </div>

      <div className="mb-3">
        <select
          className="form-select w-auto"
          value={selectedEmployee}
          onChange={(e) => fetchAttendance(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
      </div>

      {loading && <Loader />}
      {!loading && attendance.length === 0 && selectedEmployee && <EmptyState message="No attendance records found." />}
      {!loading && attendance.length > 0 && (
        <Table bordered hover responsive>
          <thead className="table-dark">
            <tr><th>#</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {attendance.map((a, i) => (
              <tr key={a.id}><td>{i+1}</td><td>{a.date}</td><td>{a.status}</td></tr>
            ))}
          </tbody>
        </Table>
      )}

      <AttendanceForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleMarkAttendance}
        employees={employees}
      />
    </MainLayout>
  );
}
