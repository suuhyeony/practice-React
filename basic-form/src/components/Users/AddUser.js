import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';
import { useRef, useState } from 'react';
import ErrorModal from '../UI/ErrorModal';

const AddUser = props => {
  // const [enteredUserName, setEnteredUserName] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  // useState대신 useRef를 사용(=비제어 컴포넌트)하면, 코드는 줄지만 DOM을 건드린다는 단점이 있음 (읽어오거나 초기화 정도는 괜찮다)
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const nameValue = nameInputRef.current.value;
    const ageValue = ageInputRef.current.value;

    console.log(nameValue, ageValue);
    if (nameValue.trim().length === 0 || ageValue.trim().length === 0) {
      setError({
        title: 'invalid input',
        message: 'please check your input (is there empty input?)'
      })
      return;
    }
    if (+ageValue < 1) {
      setError({
        title: 'invalid age',
        message: 'please check your age (is smaller than 1?)'
      })
      return;
    }
    props.onAddUser(nameValue, ageValue);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  // const userNameChangeHandler = (event) => {
  //   setEnteredUserName(event.target.value);
  // };
  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="name">userName</label>
          <input id="name" type="text" ref={nameInputRef} />
          <label htmlFor="age">age</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;