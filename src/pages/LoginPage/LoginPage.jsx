import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../redux/auth/operations.js';
import {
  selectAuthLoading,
  selectAuthError,
} from '../../redux/auth/selectors.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoginSchema } from '../../validation.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import React, { useRef, useState } from 'react';
import { validateLogin } from '../../validation.js';

import styles from './LoginPage.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Відправляємо тільки потрібні поля
      const payload = {
        email: values.email,
        password: values.password,
      };
      const result = await dispatch(login(payload)).unwrap();
      toast.success('Login successful', { position: 'top-right' });
      resetForm();

      // Редірект на dashboard або на попередню сторінку
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage = error || 'Login failed';
      toast.error(errorMessage, { position: 'top-right' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.loginBg}>
        <div className={styles.loginContainer}>
          <h2 className={styles.title}>Login</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            validate={validateLogin}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form}>
                <label className={styles.label} htmlFor="email">
                  Enter your email address
                </label>
                <Field
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />

                <label className={styles.label} htmlFor="password">
                  Create a strong password
                </label>
                <div className={styles.passwordWrapper}>
                  <Field
                    className={styles.input}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="*********"
                  />
                  <button
                    type="button"
                    className={styles.showPasswordBtn}
                    onClick={() => setShowPassword(prev => !prev)}
                    tabIndex={-1}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />

                <button
                  className={styles.loginBtn}
                  type="submit"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? 'Logging in...' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>
          <div className={styles.registerText}>
            Don&apos;t have an account?{' '}
            <a
              href="#"
              className={styles.registerLink}
              onClick={e => {
                e.preventDefault();
                navigate('/auth/register');
              }}
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
