import {StyleSheet, View} from "react-native";
import ListedExpenses from "../components/ListedExpenses/ListedExpenses";
import {useContext} from "react";
import {Expense, ExpensesContext} from "../store/expenses-context";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);
  const filteredExpenses: Expense[] = expensesContext.expenses.filter((expense) =>
    Date.now() - expense.date.getTime() < 86400000 * 7
  )

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