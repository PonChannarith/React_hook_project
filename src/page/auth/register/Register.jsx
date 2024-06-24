import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// initialValues
const initialValues = {
  email: '',
  first_name: '',
  last_name: '',
  password1: '',
  password2: '',
};

// validationSchema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  password1: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password1')], 'Passwords must match')
    .required('Confirm password is required'),
});

const fieldStyle = 'w-full p-2 border border-gray-300 rounded-md';

const Register = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  const handleViewConfirmPassword = () => {
    setViewConfirmPassword(!viewConfirmPassword);
  };

  const handleRegister = (values) => {
    // Handle form submission logic here
    console.log(values);
    toast.success('Registration successful!');
  };

  return (
    <div className="flex w-full p-10 h-screen justify-center items-center flex-col bg-blue-700">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleRegister(values);
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="flex bg-white gap-4 rounded-lg w-1/2 p-10 flex-col">
            <div className="flex w-full flex-col">
              <label htmlFor="email">Email:</label>
              <Field
                className={fieldStyle}
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm italic"
              />
            </div>
            <div className="flex w-full relative flex-col">
              <label htmlFor="password1">Password:</label>
              <Field
                className={fieldStyle}
                name="password1"
                type={viewPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password1"
                component="div"
                className="text-red-600 text-sm italic"
              />
              <div onClick={handleViewPassword} className="absolute top-[40px] right-[10px] cursor-pointer">
                {viewPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="flex relative w-full flex-col">
              <label htmlFor="password2">Confirm Password:</label>
              <Field
                className={fieldStyle}
                name="password2"
                type={viewConfirmPassword ? "text" : "password"}
                placeholder="Enter your confirm password"
              />
              <ErrorMessage
                name="password2"
                component="div"
                className="text-red-600 text-sm italic"
              />
              <div onClick={handleViewConfirmPassword} className="absolute top-[40px] right-[10px] cursor-pointer">
                {viewConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="first_name">First name:</label>
              <Field
                className={fieldStyle}
                name="first_name"
                type="text"
                placeholder="Enter your first name"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-600 text-sm italic"
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="last_name">Last name:</label>
              <Field
                className={fieldStyle}
                name="last_name"
                type="text"
                placeholder="Enter your last name"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-red-600 text-sm italic"
              />
            </div>
            <div className="flex justify-end">
              <button
                disabled={isSubmitting}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Register;
