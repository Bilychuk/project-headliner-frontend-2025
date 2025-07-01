import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/auth/operations.js';
import { validateLogin } from '../validation.js';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const validationError = validateLogin({ email, password });
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    dispatch(login(email, password));
  };

  const handleRegisterClick = e => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <button className={styles.loginBtn} type="submit">
            Login
          </button>
        </form>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.registerText}>
          Don&apos;t have an account?{' '}
          <a
            href="#"
            className={styles.registerLink}
            onClick={handleRegisterClick}
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
