import { useState, FormEvent } from 'react';

import { LoginData, SignupData } from '../../types';
import classes from './Form.module.css';

interface PropsType {
  isLogin: boolean;
  onLogin?: (loginData: LoginData) => void;
  onSignup?: (signUpData: SignupData) => void;
  inProgress: boolean;
}

const Form: React.FC<PropsType> = ({
  isLogin,
  onLogin,
  onSignup,
  inProgress,
}) => {
  //set initial state
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  //handling form submission
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    //validate inputs
    const errors = [];

    if (!email.includes('@') || !email.includes('.')) {
      setEmailError(true);
      errors.push('email');
    }

    if (password.length < 8) {
      setPasswordError(true);
      errors.push('password');
    }

    if (!isLogin) {
      if (name.length === 0) {
        setNameError(true);
        errors.push('name');
      }

      if (passwordConfirm !== password) {
        setPasswordConfirmError(true);
        errors.push('passwordConfirm');
      }
    }

    if (errors.length > 0) return;

    //make api request
    if (isLogin) {
      onLogin({ email, password });
    } else {
      onSignup({ name, email, password, passwordConfirm });
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={onFormSubmit}>
        {!isLogin && (
          <div className={classes.formControl}>
            <div
              className={`${classes.inputContainer} ${
                nameError ? classes.error : null
              }`}
            >
              <input
                type="text"
                placeholder="Enter your profile name"
                id="name"
                onChange={e => {
                  setName(e.target.value);

                  if (nameError) {
                    if (name.length > 0) {
                      setNameError(false);
                    }
                  }
                }}
                value={name}
                autoComplete="off"
              />
              <label htmlFor="name">Name:</label>
            </div>
            {nameError && (
              <div className={classes.errorMsg}>Please enter a name</div>
            )}
          </div>
        )}

        <div className={classes.formControl}>
          <div
            className={`${classes.inputContainer} ${
              emailError ? classes.error : null
            }`}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              id="email"
              onChange={e => {
                setEmail(e.target.value);

                if (emailError) {
                  if (email.includes('@') && email.includes('.')) {
                    setEmailError(false);
                  }
                }
              }}
              value={email}
              autoComplete="off"
            />
            <label htmlFor="email">Email:</label>
          </div>
          {emailError && (
            <div className={classes.errorMsg}>
              Please provide a valid email address
            </div>
          )}
        </div>

        <div className={classes.formControl}>
          <div
            className={`${classes.inputContainer} ${
              passwordError ? classes.error : null
            }`}
          >
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              onChange={e => {
                setPassword(e.target.value);

                if (passwordError) {
                  if (password.length >= 8) {
                    setPasswordError(false);
                  }
                }
              }}
              value={password}
              autoComplete="off"
            />
            <label htmlFor="password">Password:</label>
          </div>
          {passwordError && (
            <div className={classes.errorMsg}>
              A password should be at least 8 characters long
            </div>
          )}
        </div>

        {!isLogin && (
          <div className={classes.formControl}>
            <div
              className={`${classes.inputContainer} ${
                passwordConfirmError ? classes.error : null
              }`}
            >
              <input
                type="password"
                placeholder="Confirm your password"
                id="passwordConfirm"
                onChange={e => {
                  setPasswordConfirm(e.target.value);

                  if (passwordConfirmError) {
                    if (passwordConfirm.length > 0) {
                      setPasswordConfirmError(false);
                    }
                  }
                }}
                value={passwordConfirm}
                autoComplete="off"
              />
              <label htmlFor="passwordConfirm">Confirm Password:</label>
            </div>
            {passwordConfirmError && (
              <div className={classes.errorMsg}>
                Passwords provided does not match
              </div>
            )}
          </div>
        )}

        <div className={classes.btnContainer}>
          <button className={classes.btn}>
            {isLogin && inProgress && 'Logging In...'}
            {isLogin && !inProgress && 'Login'}
            {!isLogin && inProgress && 'Signing Up...'}
            {!isLogin && !inProgress && 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
