import {createContext, useReducer} from "react";

export type ExpensePrototype = {
  description: string
  amount: number
  date: Date
}

export type Expense = {
  id: string
  description: string
  amount: number
  date: Date
}

export const ExpensesContext = createContext({
  expenses: [] as Expense[],
  addExpense: ({}: Expense) => {},
  setExpenses: (expenses: Expense[]) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, {}: ExpensePrototype) => {},
});

type actionTypes = 'ADD' | "SET" | 'UPDATE' | 'DELETE'

type payloadType = {
  "ADD": { data: ExpensePrototype }
  "SET": {expenses: Expense[] }
  "UPDATE": { id: string, data: ExpensePrototype }
  "DELETE": { id: string }
}

function expensesReducer<TAction extends actionTypes> (state: Expense[], action: { actionType: TAction, payload: payloadType[TAction] }) {
  if (action.actionType === 'ADD' && "data" in action.payload) {
    // // @ts-ignore
    return [{...action.payload.data} as Expense, ...state];
  }

  if (action.actionType === "SET" && "expenses" in action.payload) {
    return action.payload.expenses;
  }

  if (action.actionType === 'UPDATE' && "data" in action.payload && "id" in action.payload) {
    const id: string = action.payload.id;
    // // @ts-ignore
    const expenseToModifyIndex = state.findIndex((expense: Expense) => expense.id === id);
    const expenseToModify = state[expenseToModifyIndex];
    // // @ts-ignore
    const modifiedExpense = {...expenseToModify, ...action.payload.data};
    const modifiedExpenses = [...state];
    modifiedExpenses[expenseToModifyIndex] = modifiedExpense;
    return modifiedExpenses;
  }

  if (action.actionType === 'DELETE' && "id" in action.payload) {
    const id: string = action.payload.id
    // // @ts-ignore
    return state.filter((expense) => expense.id !== id)
  }

  return state
}

function ExpensesContextProvider({children}: {children: any}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, [] as Expense[]);

  function addExpense(expenseData: ExpensePrototype) {
    dispatch({ actionType: 'ADD', payload: {data: expenseData} });
  }

  function setExpenses(expenses: Expense[]) {
    dispatch({actionType: 'SET', payload: {expenses: expenses} })
  }

  function deleteExpense(id: string) {
    dispatch({ actionType: 'DELETE', payload: {id: id} });
  }

  function updateExpense(id: string, expenseData: ExpensePrototype) {
    dispatch({ actionType: 'UPDATE', payload: {id: id, data: expenseData} });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  }

  return <ExpensesContext.Provider value={value}>
    {children}
  </ExpensesContext.Provider>
}

export default ExpensesContextProvider;