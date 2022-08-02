import {StyleSheet, View} from "react-native";
import ListedExpenses from "../components/ListedExpenses/ListedExpenses";
import {useContext, useEffect} from "react";
import {Expense, ExpensesContext} from "../store/expenses-context";
import {fetchExpenses} from "../utilities/http";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);
  // const [fetchedExpenses, setFetchedExpenses]: [Expense[], Function] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      const expenses: Expense[] = await fetchExpenses();
      expensesContext.setExpenses(expenses);
    }
    getExpenses();
  }, [])

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