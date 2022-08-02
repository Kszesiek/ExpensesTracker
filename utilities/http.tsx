import axios from "axios";
import {Expense, ExpensePrototype} from "../store/expenses-context";
import server from "../constants/backend";

export function storeExpense(expenseData: ExpensePrototype) {
  axios.post(
    server.url + "/expenses.json",
    expenseData,
  ).then(r => {
    console.log("Succeeded!")
  });
}

export async function fetchExpenses() {
  const response = await axios.get(
    server.url + "/expenses.json",
  )

  const expenses: Expense[] = []

  console.log(response.data);

  for (const key in response.data) {
    const expenseObject: Expense = {
      id: key,
      amount: +response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    }
    expenses.push(expenseObject);
  }

  return expenses;
}