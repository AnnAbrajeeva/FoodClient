import * as yup from 'yup';

export const authValidation = yup
  .object({
    username: yup.string().required('Name is required.').min(2, 'Name is too short - it must be from 2 letters.').matches(/[a-zA-Z]\D/, 'The field must contain only letters.'),
    surname: yup.string().required('Surname is required.').min(2, 'Name is too short - it must be from 2 letters.').matches(/[a-zA-Z]\D/, 'The field must contain only letters.'),
    email: yup.string().email().required('Email is required.'),
    login: yup
      .string()
      .required('Login is required.')
      .min(3, 'Login is too short - should be 3 chars minimum.')
      .matches( /^\w+$/, 'Login can only contains letters and numbers.'),
  })
  .required();
