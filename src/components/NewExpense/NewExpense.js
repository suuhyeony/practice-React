import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = () => {
  const saveExpenseHandler = (enteredValues) => {
    const expense = {
      ...enteredValues,
      id: Math.random().toString()
    };
    console.log(expense);
  };

  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpense={saveExpenseHandler} />
    </div>
  );
};

export default NewExpense;