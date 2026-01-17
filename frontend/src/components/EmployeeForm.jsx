import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default function EmployeeForm({ show, onHide, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", department: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.department) {
      alert("All fields are required");
      return;
    }
    onSubmit(form);
    setForm({ name: "", email: "", department: "" });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Label>Full Name *</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} />
            </Col>
            <Col md={6}>
              <Form.Label>Email *</Form.Label>
              <Form.Control type="email" name="email" value={form.email} onChange={handleChange} />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6}>
              <Form.Label>Department *</Form.Label>
              <Form.Control name="department" value={form.department} onChange={handleChange} />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
