import { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const saveExpenseHandler = (enteredValues) => {
    const expense = {
      ...enteredValues,
      id: Math.random().toString()
    };
    props.onAddExpense(expense);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  }

  const stopEditingHandler = () => {
    setIsEditing(false);
  }

  return (
    <div className="new-expense">
      {!isEditing && <button type="button" onClick={startEditingHandler}>Add new Expense</button>}
      {isEditing && <ExpenseForm onSaveExpense={saveExpenseHandler} onCancel={stopEditingHandler} />}
    </div>
  );
};

export default NewExpense;