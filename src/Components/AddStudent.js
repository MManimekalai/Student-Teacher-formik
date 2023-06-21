import React, { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../Context/ContextComponent';
import { useFormik } from 'formik';
import { basicSchema } from '../schemas';

function AddStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const Context = useContext(userContext);

  const initialValues = {
    name: '',
    email: '',
    mobile: '',
    course: ''
  };

  const validationSchema = basicSchema;

  const handleSubmit = (values) => {
    const newStudent = {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      course: values.course
    };
    const updatedStudents = [...Context.students];
    if (id !== undefined && updatedStudents[id]) {
      updatedStudents[id] = newStudent;
    } else {
      updatedStudents.push(newStudent);
    }
    Context.setStudents(updatedStudents);
    navigate('/studentslist');
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  });
  useEffect(() => {
    if (id !== undefined && Context.students[id]) {
      const student = Context.students[id];
      formik.setValues(student);
    }
  }, [id, Context.students, formik.setValues]);

  return (
    <>
      <div className="container-fluid">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
            />
            {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email ID"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
            />
            {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Mobile Number"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="mobile"
            />
            {formik.touched.mobile && formik.errors.mobile && <div>{formik.errors.mobile}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Course</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Course name"
              value={formik.values.course}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="course"
            />
            {formik.touched.course && formik.errors.course && <div>{formik.errors.course}</div>}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddStudent;
