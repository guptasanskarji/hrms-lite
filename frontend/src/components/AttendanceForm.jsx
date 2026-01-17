import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AttendanceForm({ show, onHide, onSubmit, employees }) {
  const [form, setForm] = useState({ employee_id: "", date: "", status: "Present" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.employee_id || !form.date) {
      alert("Employee and Date are required");
      return;
    }
    onSubmit({ ...form, employee_id: Number(form.employee_id) });
    setForm({ employee_id: "", date: "", status: "Present" });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Mark Attendance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Employee *</Form.Label>
            <Form.Select name="employee_id" value={form.employee_id} onChange={handleChange}>
              <option value="">Select Employee</option>
              {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date *</Form.Label>
            <Form.Control type="date" name="date" value={form.date} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status *</Form.Label>
            <Form.Select name="status" value={form.status} onChange={handleChange}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
