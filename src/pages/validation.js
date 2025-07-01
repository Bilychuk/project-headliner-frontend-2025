// Email validation
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Registration validation
export function validateRegister({ name, email, password, repeatPassword, agreed }) {
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