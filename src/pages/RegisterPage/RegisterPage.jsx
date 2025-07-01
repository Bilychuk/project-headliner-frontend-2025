import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { register } from '../../redux/auth/operations';
import { selectAuthLoading, selectAuthError } from '../../redux/auth/selectors';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { RegisterSchema } from '../../validation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      await dispatch(register(payload)).unwrap();
      toast.success('Registration successful', { position: 'top-right' });
      resetForm();
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      let errorMessage = error;
      // Якщо це 409 Conflict
      if (errorMessage && errorMessage.toString().toLowerCase().includes('conflict')) {
        errorMessage = 'Користувач з таким email вже існує. Спробуйте інший email або увійдіть.';
      }
      toast.error(errorMessage, { position: 'top-right' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.registerBg}>
        <div className={styles.registerContainer}>
          <h2 className={styles.title}>Register</h2>
          <p className={styles.subtitle}>
            Join our community of culinary enthusiasts, save your favorite recipes, and share your cooking creations
          </p>
          <Formik
            initialValues={{ name: '', email: '', password: '', repeatPassword: '', agreed: false }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form}>
                <label className={styles.label} htmlFor="name">Enter your name</label>
                <Field
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Max"
                />
                <ErrorMessage name="name" component="div" className={styles.error} />

                <label className={styles.label} htmlFor="email">Enter your email address</label>
                <Field
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@gmail.com"
                />
                <ErrorMessage name="email" component="div" className={styles.error} />

                <label className={styles.label} htmlFor="password">Create a strong password</label>
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
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className={styles.error} />

                <label className={styles.label} htmlFor="repeatPassword">Repeat your password</label>
                <div className={styles.passwordWrapper}>
                  <Field
                    className={styles.input}
                    type={showRepeatPassword ? 'text' : 'password'}
                    id="repeatPassword"
                    name="repeatPassword"
                    placeholder="*********"
                  />
                  <button
                    type="button"
                    className={styles.showPasswordBtn}
                    onClick={() => setShowRepeatPassword((prev) => !prev)}
                    tabIndex={-1}
                    aria-label={showRepeatPassword ? 'Hide password' : 'Show password'}
                  >
                    {showRepeatPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <ErrorMessage name="repeatPassword" component="div" className={styles.error} />

                <div className={styles.termsWrapper}>
                  <Field type="checkbox" id="terms" name="agreed" />
                  <label htmlFor="terms" className={styles.termsLabel}>
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>
                <ErrorMessage name="agreed" component="div" className={styles.error} />

                <button 
                  className={styles.registerBtn} 
                  type="submit" 
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? 'Creating account...' : 'Create account'}
                </button>
              </Form>
            )}
          </Formik>
          <div className={styles.loginText}>
            Already have an account?{' '}
            <a href="#" className={styles.loginLink} onClick={e => { e.preventDefault(); navigate('/login'); }}>Log in</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage; 

