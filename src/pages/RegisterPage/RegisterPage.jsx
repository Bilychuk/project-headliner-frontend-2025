import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/auth/operations.js';
import { validateRegister } from '../validation.js';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const termsRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;
    const agreed = termsRef.current.checked;

    const validationError = validateRegister({
      name,
      email,
      password,
      repeatPassword,
      agreed,
    });
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    dispatch(register(name, email, password));
  };

  const handleLoginClick = e => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className={styles.registerBg}>
      <div className={styles.registerContainer}>
        <h2 className={styles.title}>Register</h2>
        <p className={styles.subtitle}>
          Join our community of culinary enthusiasts, save your favorite
          recipes, and share your cooking creations
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="name">
            Enter your name
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            placeholder="Max"
            ref={nameRef}
            required
          />
          <label className={styles.label} htmlFor="email">
            Enter your email address
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="email@gmail.com"
            ref={emailRef}
            required
          />
          <label className={styles.label} htmlFor="password">
            Create a strong password
          </label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="*********"
              ref={passwordRef}
              required
            />
            <button
              type="button"
              className={styles.showPasswordBtn}
              onClick={() => setShowPassword(prev => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <label className={styles.label} htmlFor="repeatPassword">
            Repeat your password
          </label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showRepeatPassword ? 'text' : 'password'}
              id="repeatPassword"
              placeholder="*********"
              ref={repeatPasswordRef}
              required
            />
            <button
              type="button"
              className={styles.showPasswordBtn}
              onClick={() => setShowRepeatPassword(prev => !prev)}
              tabIndex={-1}
              aria-label={
                showRepeatPassword ? 'Hide password' : 'Show password'
              }
            >
              {showRepeatPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <div className={styles.termsWrapper}>
            <input type="checkbox" id="terms" ref={termsRef} required />
            <label htmlFor="terms" className={styles.termsLabel}>
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          <button className={styles.registerBtn} type="submit">
            Create account
          </button>
        </form>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.loginText}>
          Already have an account?{' '}
          <a href="#" className={styles.loginLink} onClick={handleLoginClick}>
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
