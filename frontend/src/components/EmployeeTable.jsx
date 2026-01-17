import { Table, Button } from "react-bootstrap";

export default function EmployeeTable({ employees, onDelete }) {
  return (
    <Table bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((e, i) => (
          <tr key={e.id}>
            <td>{i + 1}</td>
            <td>{e.name}</td>
            <td>{e.email}</td>
            <td>{e.department}</td>
            <td>
              <Button variant="danger" size="sm" onClick={() => onDelete(e.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
