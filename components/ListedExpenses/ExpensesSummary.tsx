import {StyleSheet, Text, View} from "react-native";
import {Expense} from "./ListedExpenses";
import {GlobalStyles} from "../../constants/styles";

type props = {
  expenses: Expense[]
  periodName: string
}

function ExpensesSummary({expenses, periodName}: props) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  )
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 16,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary400,
    marginRight: 8,
  },
})