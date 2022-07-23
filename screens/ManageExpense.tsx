import {StyleSheet, Text, View} from "react-native";

function ManageExpense() {
  return <View style={styles.container}>
    <Text>ManageExpense</Text>
  </View>
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});