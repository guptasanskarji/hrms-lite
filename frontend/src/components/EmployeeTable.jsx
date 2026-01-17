import { useState, useMemo } from "react";
import { Table, Button, Form, Row, Col, InputGroup } from "react-bootstrap";

export default function EmployeeTable({ employees, onDelete }) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterDept, setFilterDept] = useState("");

  // Get unique departments for filter
  const departments = [...new Set(employees.map(e => e.department))];

  // Handle sorting
  const sortedEmployees = useMemo(() => {
    let sortable = [...employees];

    if (filterDept) {
      sortable = sortable.filter(e => e.department === filterDept);
    }

    if (search) {
      sortable = sortable.filter(
        e =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.email.toLowerCase().includes(search.toLowerCase()) ||
          e.department.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortConfig.key) {
      sortable.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sortable;
  }, [employees, search, sortConfig, filterDept]);

  const requestSort = key => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const getSortIcon = key => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <>
      {/* Filters */}
      <Row className="mb-3">
        <Col md={6} className="mb-2">
          <InputGroup>
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
              placeholder="Name, Email, Department..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4} className="mb-2">
          <Form.Select value={filterDept} onChange={e => setFilterDept(e.target.value)}>
            <option value="">All Departments</option>
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button variant="secondary" className="w-100" onClick={() => { setSearch(""); setFilterDept(""); }}>
            Reset
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <Table bordered hover responsive className="shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th style={{ cursor: "pointer" }} onClick={() => requestSort("name")}>
              Full Name {getSortIcon("name")}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => requestSort("email")}>
              Email {getSortIcon("email")}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => requestSort("department")}>
              Department {getSortIcon("department")}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.length > 0 ? (
            sortedEmployees.map((e, i) => (
              <tr key={e.id} className="align-middle text-center">
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => onDelete(e.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
