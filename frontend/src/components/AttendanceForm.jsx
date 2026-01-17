import { useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";

export default function AttendanceForm({ show, onHide, onSubmit, employees }) {
  const [form, setForm] = useState({ employee_id: "", date: "", status: "Present" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

 
  };

  const handleSubmit = () => {
    if (!form.employee_id || !form.date) {
      alert("Employee and Date are required");
      return;
    }
    onSubmit({ ...form, employee_id: Number(form.employee_id) });
    setForm({ employee_id: "", date: "", status: "Present" });

  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      className="rounded-4 shadow-lg"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold">Mark Attendance</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Employee <span className="text-danger">*</span></Form.Label>
            <Form.Select 
              name="employee_id" 
              value={form.employee_id} 
              onChange={handleChange} 
              className="rounded-pill"
            >
              <option value="">Select Employee</option>
              {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Date <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              type="date" 
              name="date" 
              value={form.date} 
              onChange={handleChange} 
              className="rounded-pill"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Status <span className="text-danger">*</span></Form.Label>
            <Form.Select 
              name="status" 
              value={form.status} 
              onChange={handleChange} 
              className="rounded-pill"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button variant="outline-secondary" onClick={onHide} className="rounded-pill px-4">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="rounded-pill px-4 text-white" 
          style={{ background: "linear-gradient(90deg, #007bff, #00c6ff)", border: "none" }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
