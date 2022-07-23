import {Text, View, StyleSheet, FlatList} from "react-native";
import {Expense} from "./ListedExpenses";

type props = {
  expenses: Expense[]
}

function ExpensesList({expenses}: props) {
  return (
    <View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => <Text>{itemData.item.description}</Text>}
      />
    </View>
  );
}

export default ExpensesList;

const styles = StyleSheet.create({
});