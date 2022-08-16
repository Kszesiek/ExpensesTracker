import {StyleSheet, View} from "react-native";
import {useRoute, useNavigation, RouteProp} from "@react-navigation/native";
import {NavigationProps, StackParamList} from "../App";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";
import {Expense, ExpensePrototype, ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, storeExpense, updateExpense} from "../utilities/http";

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

  async function deleteExpensePressed() {
    await deleteExpense(expenseId);
    expensesContext.deleteExpense(expenseId);
    navigation.goBack();
  }

  function abortPressed() {
    navigation.goBack();
  }

  async function submitPressed(expenseData: ExpensePrototype) {
    if (isEditing) {
      await updateExpense(expenseId, expenseData);
      expensesContext.updateExpense(expenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesContext.addExpense({...expenseData, id: id});
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