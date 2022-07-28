import {StyleSheet, View} from "react-native";
import {useRoute, useNavigation, RouteProp} from "@react-navigation/native";
import {NavigationProps, StackParamList} from "../App";
import {useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";
import CustomButton from "../components/UI/CustomButton";

function ManageExpense() {
  const route = useRoute<RouteProp<StackParamList, "ManageExpense">>();
  const navigation = useNavigation<NavigationProps>();

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add new expense"
    });
  }, [navigation, isEditing])

  function deleteExpensePressed() {

    navigation.goBack();
  }

  function abortPressed() {
    navigation.goBack();
  }

  function addOrEditExpensePressed() {

    navigation.goBack();
  }

  return <View style={styles.container}>
    <View style={styles.buttons}>
      <View>
        <CustomButton mode="flat" style={styles.button} onPress={abortPressed}>Abort</CustomButton>
      </View>
      <View>
        <CustomButton style={styles.button} onPress={addOrEditExpensePressed}>{isEditing ? 'Update' : 'Add'}</CustomButton>
      </View>
    </View>

    {isEditing &&
      <View style={styles.deleteContainer}>
        <IconButton icon="trash" size={36} color={GlobalStyles.colors.error500} onPress={deleteExpensePressed} />
      </View>}

  </View>
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});