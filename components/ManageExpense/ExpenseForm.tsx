import {View, StyleSheet} from "react-native";
import Input from "./Input";
import {useState} from "react";
import CustomButton from "../UI/CustomButton";
import {expensePrototype} from "../../store/expenses-context";

type inputValuesType = {
  amount: string,
  date: string,
  description: string,
}

type propsType = {
  initialExpenseData?: expensePrototype,
  submitButtonLabel: string,
  onCancel: () => any,
  onSubmit: (expenseData: expensePrototype) => any,
}

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, initialExpenseData}: propsType) {
  const [inputValues, setInputValues]: [inputValuesType, Function] = useState({
    amount: initialExpenseData ? initialExpenseData.amount.toFixed(2).toString() : "",
    date: initialExpenseData ? initialExpenseData.date.toISOString().slice(0, 10) : "",
    description: initialExpenseData ? initialExpenseData.description : "",
  })

  function inputChangedHandler<InputParam extends keyof typeof inputValues>(inputIdentifier: InputParam, enteredValue: inputValuesType[InputParam]) {
    setInputValues((currentInputValues: typeof inputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      }
    })
  }

  function submitPressed() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    }

    onSubmit(expenseData);
  }

  return (
    <View>
      <View style={styles.dateAmountRow}>
        <Input label="Amount" style={styles.amountStyle}
        textInputProps={{
          keyboardType: 'decimal-pad',
          onChangeText: inputChangedHandler.bind(null, "amount"),
          value: inputValues.amount,
        }} />
        <Input label="Date"
        textInputProps={{
          placeholder: "YYYY-MM-DD",  // new Date().toLocaleDateString().replace(/\./g,  '-')
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(null, "date"),
          value: inputValues.date,
        }} />
      </View>
      <Input label="Description" textInputProps={{
        multiline: true,
        value: inputValues.description,
        onChangeText: inputChangedHandler.bind(null, "description"),
        // autoCorrect: false,  // default is true
        // autoCapitalize: 'sentences',  // default is sentences
      }} />
      <View style={styles.buttons}>
        <View>
          <CustomButton mode="flat" style={styles.button} onPress={onCancel}>Abort</CustomButton>
        </View>
        <View>
          <CustomButton style={styles.button} onPress={submitPressed}>{submitButtonLabel}</CustomButton>
        </View>
      </View>
    </View>
  )
}

export default ExpenseForm;

const styles = StyleSheet.create({
  dateAmountRow: {
    flexDirection: 'row',
  },
  amountStyle: {
    flex: 1,
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});




