// Email validation
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Registration validation
export function validateRegister({
  name,
  email,
  password,
  repeatPassword,
  agreed,
}) {
  if (!name || !name.trim()) {
    return 'Name is required';
  }
  if (!validateEmail(email)) {
    return 'Enter a valid email address';
  }
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (password !== repeatPassword) {
    return 'Passwords do not match';
  }
  if (!agreed) {
    return 'You must agree to the Terms of Service and Privacy Policy';
  }
  return '';
}

// Login validation
export function validateLogin({ email, password }) {
  if (!validateEmail(email)) {
    return 'Enter a valid email address';
  }
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return '';
}

// Yup schemas for Formik validation
import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Repeat your password'),
  agreed: Yup.boolean().oneOf(
    [true],
    'You must agree to the Terms of Service and Privacy Policy'
  ),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
