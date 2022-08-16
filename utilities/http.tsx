import axios from "axios";
import {Expense, ExpensePrototype} from "../store/expenses-context";
import server from "../constants/backend";

export async function storeExpense (expenseData: ExpensePrototype) {
  const response = await axios.post(
    server.url + "/expenses.json",
    expenseData
  );
  return response.data.name;  // id of newly added expense
}

export async function fetchExpenses () {
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

export function updateExpense (id: string, expenseData: ExpensePrototype) {
  return axios.put(
    server.url + `/expenses/${id}.json`,
    expenseData
    )
}

export function deleteExpense (id: string) {
 return axios.delete(
   server.url + `/expenses/${id}.json`
 )
}