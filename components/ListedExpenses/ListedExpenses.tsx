import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";

type props = {
  expenses: any[]
  expensesPeriod: string
}

function ListedExpenses({expenses, expensesPeriod}: props) {

  const content = expenses.length > 0 ?
  <ExpensesList expenses={expenses} />
    :
  <View style={styles.noExpensesContainer}>
    <View style={{flex: 2}} />
    <Text style={styles.noExpensesText}>No expenses to show here.</Text>
    <View style={{flex: 3}} />
    <Text style={[styles.noExpensesText, styles.noExpensesTextBottom]}>You can add expenses by tapping the plus icon in the upper right corner of the screen.</Text>
  </View>

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ListedExpenses;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  noExpensesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noExpensesText: {
    color: GlobalStyles.colors.primary50,
    textAlign: 'center',
    fontSize: 16,
  },
  noExpensesTextBottom: {
    fontStyle: 'italic',
    fontSize: 13,
  },
});