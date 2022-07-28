import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {StyleSheet, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";

type props = {
  expenses: any[]
  expensesPeriod: string
}

function ListedExpenses({expenses, expensesPeriod}: props) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
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
  }
});