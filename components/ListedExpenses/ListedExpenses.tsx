import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {StyleSheet, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";

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

type props = {
  expenses: any[]
  expensesPeriod: string
}

function ListedExpenses({expenses, expensesPeriod}: props) {
  expenses = DUMMY_EXPENSES;

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