import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "../NewExpense/ExpensesFilter";
import { useState } from "react";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2024');
  
  const filterHandler = (value) => {
    console.log('im expenses component')
    setFilteredYear(value);
  }

  return (
    <Card className="expenses">
      <ExpensesFilter selected={filteredYear} onChangeFilter={filterHandler} />
      <ExpenseItem
        title={props.item[0].title}
        date={props.item[0].date}
        amount={props.item[0].amount}
      />
      <ExpenseItem
        title={props.item[1].title}
        date={props.item[1].date}
        amount={props.item[1].amount}
      />
      <ExpenseItem
        title={props.item[2].title}
        date={props.item[2].date}
        amount={props.item[2].amount}
      />
      <ExpenseItem
        title={props.item[3].title}
        date={props.item[3].date}
        amount={props.item[3].amount}
      />
    </Card>
  );
};

export default Expenses;
