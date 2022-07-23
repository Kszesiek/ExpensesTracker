import {StyleSheet, View} from "react-native";
import ListedExpenses from "../components/ListedExpenses/ListedExpenses";

function RecentExpenses() {
  return <View style={styles.container}>
    <ListedExpenses expenses={[]} expensesPeriod="Last week" />
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