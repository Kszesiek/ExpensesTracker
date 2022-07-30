import {StyleSheet, View} from "react-native";
import {useRoute, useNavigation, RouteProp} from "@react-navigation/native";
import {NavigationProps, StackParamList} from "../App";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";
import {Expense, expensePrototype, ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense() {
  const route = useRoute<RouteProp<StackParamList, "ManageExpense">>();
  const navigation = useNavigation<NavigationProps>();
  const expensesContext = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const editedExpense = expensesContext.expenses.find((expense: Expense) => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add new expense"
    });
  }, [navigation, isEditing])

  function deleteExpensePressed() {
    expensesContext.deleteExpense(expenseId);
    navigation.goBack();
  }

  function abortPressed() {
    navigation.goBack();
  }

  function submitPressed(expenseData: expensePrototype) {
    if (isEditing) {
      expensesContext.updateExpense(expenseId, expenseData);
    } else {
      expensesContext.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return <View style={styles.container}>
    <View style={{flex: 1}} />
    <ExpenseForm
      onCancel={abortPressed}
      onSubmit={submitPressed}
      submitButtonLabel={isEditing ? "Update" : "Add"}
      initialExpenseData={isEditing ? editedExpense : undefined}
    />
    {isEditing &&
      <View style={styles.deleteContainer}>
        <IconButton icon="trash" size={36} color={GlobalStyles.colors.error500} onPress={deleteExpensePressed} />
      </View>}
    <View style={{flex: 3}} />
  </View>
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
    // justifyContent: 'center',
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});