import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../Context/ContextComponent';


function StudentsList() {
  const context = useContext(userContext);
  const navigate = useNavigate();

  const handleEdit = (index) => {
    navigate(`/edit-student/${index}`);
  };

  const handleDelete = (index) => {
    const updatedStudents = [...context.students];
    updatedStudents.splice(index, 1);
    context.setStudents(updatedStudents);
  };

  return (
    <>
      <Table bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Course</th>
            <th>Batch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {context.students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.mobile}</td>
              <td>{student.course}</td>
              <td>{student.batch}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(index)}>
                  Edit
                </Button>
                &nbsp;&nbsp;
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={() => navigate('/addstudent')}>
        Add New Student
      </Button>
    </>
  );
}

export default StudentsList;
