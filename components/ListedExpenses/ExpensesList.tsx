import {View, StyleSheet, FlatList} from "react-native";
import ExpensesListItem from "./ExpensesListItem";
import {Expense} from "../../store/expenses-context";

type props = {
  expenses: Expense[]
}

function ExpensesList({expenses}: props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => <ExpensesListItem expense={itemData.item} /> }
      />
    </View>
  );
}

export default ExpensesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});