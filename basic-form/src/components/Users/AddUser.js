import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';
import { useState } from 'react';
import ErrorModal from '../UI/ErrorModal';

const AddUser = props => {
  const [enteredUserName, setEnteredUserName] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(enteredUserName, enteredAge);
    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'invalid input',
        message: 'please check your input (is there empty input?)'
      })
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'invalid age',
        message: 'please check your age (is smaller than 1?)'
      })
      return;
    }
    props.onAddUser(enteredUserName, enteredAge);
    setEnteredUserName('');
    setEnteredAge('');
  };

  const userNameChangeHandler = (event) => {
    setEnteredUserName(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="name">userName</label>
          <input id="name" type="text" value={enteredUserName} onChange={userNameChangeHandler} />
          <label htmlFor="age">age</label>
          <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;