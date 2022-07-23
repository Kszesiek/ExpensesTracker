import {StyleSheet, View} from "react-native";
import ListedExpenses from "../components/ListedExpenses/ListedExpenses";

function AllExpenses() {
  return <View style={styles.container}>
    <ListedExpenses expenses={[]} expensesPeriod="History" />
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