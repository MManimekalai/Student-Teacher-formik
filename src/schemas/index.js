import * as yup from 'yup';

export const basicSchema = yup.object().shape({
    name: yup.string().max(15, 'Must be 15 characters or less').required("This field is Mandatory"),
    email: yup.string().email("Please enter a valid email address").required("This field is Mandatory"),
    mobile: yup.string().required("This field is Mandatory"),
    course: yup.string().max(15, 'Must be 15 characters or less').required("This field is Mandatory"),
  });
  