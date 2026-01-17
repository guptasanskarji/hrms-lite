import { useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";

export default function EmployeeForm({ show, onHide, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", department: "", avatar: null });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleSubmit = () => {
    if (!form.name || !form.email || !form.department) {
      alert("All fields are required");
      return;
    }
    onSubmit(form);
    setForm({ name: "", email: "", department: "", avatar: null });
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      className="rounded-4 shadow-lg"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold">Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label className="fw-semibold">Full Name <span className="text-danger">*</span></Form.Label>
              <Form.Control 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                placeholder="Enter full name" 
                className="rounded-pill"
              />
            </Col>
            <Col md={6}>
              <Form.Label className="fw-semibold">Email <span className="text-danger">*</span></Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                placeholder="Enter email address" 
                className="rounded-pill"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label className="fw-semibold">Department <span className="text-danger">*</span></Form.Label>
              <Form.Control 
                name="department" 
                value={form.department} 
                onChange={handleChange} 
                placeholder="Enter department" 
                className="rounded-pill"
              />
            </Col>
          </Row>
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
