import React, { useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { userContext } from '../Context/ContextComponent';


function Dashboard() {
  let Context=useContext(userContext)

  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  const handleAssignStudent = (teacherId, studentId) => {
    const updatedTeachers = Context.teachers.map((teacher) => {
      if (teacher.id === teacherId) {
        const updatedStudents = teacher.students ? [...Context.teachers.students, studentId] : [studentId];
        return {
          ...Context.teachers,
          students: updatedStudents,
        };
      }
      return teacher;
    });
    Context.setTeachers(updatedTeachers);
    handleCloseModal();
  };

  const handleRemoveStudent = (teacherId, studentId) => {
    const updatedTeachers = Context.teachers.map((teacher) => {
      if (teacher.id === teacherId) {
        const updatedStudents = teacher.students.filter((student) => student !== studentId);
        return {
          ...Context.teachers,
          students: updatedStudents,
        };
      }
      return teacher;
    });
    Context.setTeachers(updatedTeachers);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeacher('');
    setSelectedStudent('');
  };

  const handleOpenModal = (teacherId) => {
    setSelectedTeacher(teacherId);
    setShowModal(true);
  };

  const getAssignedStudentCount = (teacherId) => {
    const teacher = Context.teachers.find((teacher) => teacher.id === teacherId);
    return teacher && teacher.students ? teacher.students.length : 0;
  };

  return (
    <>
      <h1>Dashboard</h1>
      <div className="card-container">
        {Context.teachers.map((teacher) => (
          <Card
            className="text-align"
            border="primary"
            style={{ width: '18rem', flexBasis: '30%', marginBottom: '30px' }}
            key={teacher.id}
          >
            <Card.Header>
              <h3>{teacher.name}</h3>
            </Card.Header>
            <Card.Body>
              <div className="contents">
                <Card.Text>
                  <b>Email: </b>
                  {teacher.email}
                </Card.Text>
                <Card.Text>
                  <b>Mobile: </b>
                  {teacher.mobile}
                </Card.Text>
                <Card.Text>
                  <b>Expert in: </b>
                  {teacher.expertise}
                </Card.Text>
                <Card.Text>
                  <b>No. of students assigned: </b>
                  {getAssignedStudentCount(teacher.id)}
                </Card.Text>
              </div>
              <div className="m-3">
                <Button variant="primary" onClick={() => handleOpenModal(teacher.id)}>
                  Assign Student
                </Button>
                &nbsp; &nbsp;
                <Button
                  variant="danger"
                  onClick={() => handleRemoveStudent(teacher.id, selectedStudent)}
                  disabled={!selectedStudent}
                >
                  Remove Student
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Student to Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="selectStudent">
            <Form.Label>Select a student:</Form.Label>
            <Form.Control
              as="select"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">-- Select a student --</option>
              {Context.students.map((student) => (
                <option value={student.id} key={student.id}>
                  {student.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleAssignStudent(selectedTeacher, selectedStudent)}
            disabled={!selectedStudent}
          >
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Dashboard;
