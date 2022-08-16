import {StyleSheet, View} from "react-native";
import ListedExpenses from "../components/ListedExpenses/ListedExpenses";
import {useContext, useEffect, useState} from "react";
import {Expense, ExpensesContext} from "../store/expenses-context";
import {fetchExpenses} from "../utilities/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetched, setIsFetched]: [boolean, Function] = useState(false);
  const [errorOccured, setErrorOccured]: [boolean, Function] = useState(false);
  const expensesContext = useContext(ExpensesContext);

  async function getExpenses() {
    setIsFetched(false);
    try {
      const expenses: Expense[] = await fetchExpenses();
      expensesContext.setExpenses(expenses);
    } catch (error) {
      setErrorOccured(true)
    }
    setIsFetched(true);
  }

  useEffect(() => {
    getExpenses();
  }, [])

  const filteredExpenses: Expense[] = expensesContext.expenses.filter((expense) =>
    Date.now() - expense.date.getTime() < 7 * 24 * 60 * 60 * 1000
  )

  function errorHandler() {
    setErrorOccured(false);
    getExpenses();
  }

  if (!isFetched) {
    return <LoadingOverlay />
  }

  if (isFetched && errorOccured) {
    return <ErrorOverlay message="Couldn't fetch data from the server." onConfirm={errorHandler} buttonText='Try again' />
  }

  return <View style={styles.container}>
    <ListedExpenses expenses={filteredExpenses} expensesPeriod="Last week" />
  </View>
}

export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});