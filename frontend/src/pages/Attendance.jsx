import { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import { Button, Table, Form, Row, Col, Badge, InputGroup } from "react-bootstrap";
import AttendanceForm from "../components/AttendanceForm";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Fetch all employees
  const fetchEmployees = async () => {
    try { 
      const res = await api.get("/employees"); 
      setEmployees(res.data); 
    } catch (err) { console.error(err); }
  };

  // Fetch attendance by employee
  const fetchAttendance = async (employeeId) => {
    if (!employeeId) {
      setAttendance([]);
      setSelectedEmployee("");
      return;
    }
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

  // Mark attendance
  const handleMarkAttendance = async (data) => {
    try { 
      await api.post("/attendance", data); 
      setShowForm(false); 
      fetchAttendance(data.employee_id); 
    } catch (err) { alert("Error marking attendance"); }
  };

  // Filtered & searched attendance
  const filteredAttendance = useMemo(() => {
    let filtered = [...attendance];
    if (search) {
      filtered = filtered.filter(a => {
        const emp = employees.find(e => e.id === a.employee_id);
        return emp && emp.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    if (filterDate) {
      filtered = filtered.filter(a => a.date === filterDate);
    }
    return filtered;
  }, [attendance, search, filterDate, employees]);

  // Total present days per employee
  const totalPresentMap = useMemo(() => {
    const map = {};
    attendance.forEach(a => {
      if (a.status === "Present") {
        map[a.employee_id] = (map[a.employee_id] || 0) + 1;
      }
    });
    return map;
  }, [attendance]);

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Attendance</h4>
        <Button 
          className="rounded-pill px-4"
          style={{ background: "linear-gradient(90deg, #007bff, #00c6ff)", border: "none" }}
          onClick={() => setShowForm(true)}
        >
          + Mark Attendance
        </Button>
      </div>

      {/* Employee Selection */}
      <Row className="mb-3 align-items-center">
        <Col md={4}>
          <Form.Select 
            value={selectedEmployee} 
            onChange={e => fetchAttendance(e.target.value)} 
            className="rounded-pill"
          >
            <option value="">Select Employee</option>
            {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </Form.Select>
        </Col>

        {selectedEmployee && (
          <>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>Search</InputGroup.Text>
                <Form.Control 
                  placeholder="Search..." 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  className="rounded-pill"
                />
              </InputGroup>
            </Col>

            <Col md={3}>
              <Form.Control 
                type="date" 
                value={filterDate} 
                onChange={e => setFilterDate(e.target.value)} 
                className="rounded-pill"
              />
            </Col>

            <Col md={2}>
              <Button 
                variant="secondary" 
                className="w-100 rounded-pill"
                onClick={() => { setSearch(""); setFilterDate(""); }}
              >
                Reset
              </Button>
            </Col>
          </>
        )}
      </Row>

      {loading && <Loader />}

      {!loading && selectedEmployee && filteredAttendance.length === 0 && (
        <EmptyState message="No attendance records found." />
      )}

      {!loading && filteredAttendance.length > 0 && (
        <Table bordered hover responsive className="shadow-sm">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total Present Days</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map((a, i) => (
              <tr key={a.id} className="text-center align-middle">
                <td>{i + 1}</td>
                <td>{a.date}</td>
                <td>
                  <Badge bg={a.status === "Present" ? "success" : "danger"}>{a.status}</Badge>
                </td>
                <td>
                  <Badge bg="primary">{totalPresentMap[a.employee_id] || 0}</Badge>
                </td>
              </tr>
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
