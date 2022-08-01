import {View, StyleSheet, Alert} from "react-native";
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

function writeOutArray(stringsArray: string[]): string {
  let output: string = ""
  let ending: string = ""
  if (stringsArray.length > 0) {
    output += stringsArray.shift()
  }
  if (stringsArray.length > 0) {
    ending = " and " + stringsArray.pop()
  }
  if (stringsArray.length > 0) {
    stringsArray.forEach(item => {
      output += ", " + item
    })
  }

  return output + ending
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
    const amountIsValid: boolean = !isNaN(+inputValues.amount) && +inputValues.amount > 0;
    const dateRegex = /^20(0[0-9]|1[0-9]|2[0-9])-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/;
    const dateIsValid: boolean = dateRegex.test(inputValues.date);  // && expenseData.date.toString() !== "Invalid date"
    const descriptionIsValid: boolean = inputValues.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      const wrongDataArray: string[] = []
      if (!amountIsValid)
        wrongDataArray.push("amount")
      if (!dateIsValid)
        wrongDataArray.push("date")
      if (!descriptionIsValid)
        wrongDataArray.push("description")
      const wrongDataString: string = writeOutArray(wrongDataArray)

      Alert.alert("Invalid values", `Some data seems incorrect. Please check the ${wrongDataString} and try again.`);
      return;
    }

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




