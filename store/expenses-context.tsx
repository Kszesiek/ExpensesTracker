import {createContext, useReducer} from "react";

export type expensePrototype = {
  description: string
  amount: number
  date: Date
}

export type Expense = {
  id: number
  description: string
  amount: number
  date: Date
}

const DUMMY_EXPENSES: Expense[] = [
  {
    id: 1,
    description: "reflect",
    amount: 182,
    date: new Date("2022-07-21"),
  }, {
    id: 2,
    description: "taxi",
    amount: 232,
    date: new Date("2022-07-17"),
  }, {
    id: 3,
    description: "second",
    amount: 381,
    date: new Date("2022-06-11"),
  }, {
    id: 4,
    description: "cheer",
    amount: 655,
    date: new Date("2021-01-02"),
  }, {
    id: 5,
    description: "morning",
    amount: 556,
    date: new Date("2022-07-22"),
  }, {
    id: 6,
    description: "spill",
    amount: 859,
    date: new Date("2022-02-30"),
  },
];

export const ExpensesContext = createContext({
  expenses: [] as Expense[],
  addExpense: ({}: expensePrototype) => {},
  deleteExpense: (id: number) => {},
  updateExpense: (id: number, {}: expensePrototype) => {},
});

type actionTypes = 'ADD' | 'UPDATE' | 'DELETE'

type payloadType = {
  "ADD": { data: expensePrototype }
  "UPDATE": { id: number, data: expensePrototype }
  "DELETE": { id: number }
}

function expensesReducer<TAction extends actionTypes> (state: Expense[], action: { actionType: TAction, payload: payloadType[TAction] }) {
  if (action.actionType === 'ADD' && "data" in action.payload) {
    const id = Date.now() - Math.random() * 1000000000000;
    // // @ts-ignore
    return [{...action.payload.data, id: id} as Expense, ...state];
  }

  if (action.actionType === 'UPDATE' && "data" in action.payload && "id" in action.payload) {
    const id: number = action.payload.id;
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
    const id: number = action.payload.id
    // // @ts-ignore
    return state.filter((expense) => expense.id !== id)
  }

  return state
}

function ExpensesContextProvider({children}: {children: any}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: expensePrototype) {
    dispatch({ actionType: 'ADD', payload: {data: expenseData} });
  }

  function deleteExpense(id: number) {
    dispatch({ actionType: 'DELETE', payload: {id: id} });
  }

  function updateExpense(id: number, expenseData: expensePrototype) {
    dispatch({ actionType: 'UPDATE', payload: {id: id, data: expenseData} });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  }

  return <ExpensesContext.Provider value={value}>
    {children}
  </ExpensesContext.Provider>
}

export default ExpensesContextProvider;