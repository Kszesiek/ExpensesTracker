import {StyleSheet, View} from "react-native";
import ListedExpenses from "../components/ListedExpenses/ListedExpenses";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";

function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);

  return <View style={styles.container}>
    <ListedExpenses expenses={expensesContext.expenses} expensesPeriod="History" />
  </View>
}

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});