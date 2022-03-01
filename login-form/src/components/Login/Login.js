import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.includes('@') };
  }
  if (action.type === 'USER_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === 'USER_BLUR') {
    return { value: state.value, isValid: state.value.trim().lenght > 6 };
  }
  return { value: '', isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  })

  const { isValid: emailValid } = emailState;
  const { isValid: passwordValid } = passwordState;

  useEffect(() => {
    // use debouncer
    const identifier = setTimeout(() => {
      console.log('check your form validation!');
      setFormIsValid(
        emailValid && passwordValid
      );
    }, 500);
    // cleanup func
    return () => {
      console.log('CLEAN UP!');
      clearTimeout(identifier);
    }
  }, [emailValid, passwordValid]);


  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({
      type: 'USER_INPUT',
      value: event.target.value
    });
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({
      type: 'USER_INPUT',
      value: event.target.value
    });
    // setFormIsValid(
    //   emailState.value.includes('@') && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'USER_BLUR' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.value.trim().length > 6);
    dispatchPassword({ type: 'USER_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
