import {View, StyleSheet, Alert} from "react-native";
import Input from "./Input";
import {useState} from "react";
import CustomButton from "../UI/CustomButton";
import {ExpensePrototype} from "../../store/expenses-context";
import {GlobalStyles} from "../../constants/styles";

type ValidValuePair = {
  value: string
  isInvalid: boolean
}

type inputValuesType = {
  amount: ValidValuePair,
  date: ValidValuePair,
  description: ValidValuePair,
}

type propsType = {
  initialExpenseData?: ExpensePrototype,
  submitButtonLabel: string,
  onCancel: () => any,
  onSubmit: (expenseData: ExpensePrototype) => any,
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
  const [inputs, setInputs]: [inputValuesType, Function] = useState({
    amount: {
      value: initialExpenseData ? initialExpenseData.amount.toFixed(2).toString() : "",
      isInvalid: false,
    },
    date: {
      value: initialExpenseData ? initialExpenseData.date.toISOString().slice(0, 10) : "",
      isInvalid: false,
    },
    description: {
      value: initialExpenseData ? initialExpenseData.description : "",
      isInvalid: false,
    },
  })

  function inputChangedHandler<InputParam extends keyof typeof inputs>(inputIdentifier: InputParam, enteredValue: inputValuesType[InputParam]["value"]) {
    setInputs((currentInputValues: typeof inputs) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isInvalid: false },
      }
    })
  }

  function submitPressed() {
    const amountIsValid: boolean = !isNaN(+inputs.amount.value) && +inputs.amount.value > 0;
    const dateRegex = /^20(0[0-9]|1[0-9]|2[0-9])-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/;
    const dateIsValid: boolean = dateRegex.test(inputs.date.value) && new Date(inputs.date.value).toString() !== "Invalid Date";
    const descriptionIsValid: boolean = inputs.description.value.trim().length > 0;

    setInputs((currentInputs: inputValuesType) => {
      return {
        amount: {
          value: currentInputs.amount.value,
          isInvalid: !amountIsValid,
        },
        date: {
          value: currentInputs.date.value,
          isInvalid: !dateIsValid,
        },
        description: {
          value: currentInputs.description.value,
          isInvalid: !descriptionIsValid,
        },
      };
    });

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
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    onSubmit(expenseData);
  }

  return (
    <View>
      <View style={styles.dateAmountRow}>
        <Input
          label="Amount"
          style={styles.amountStyle}
          isInvalid={inputs.amount.isInvalid}
          // onErrorText="Please enter a positive number"
          textInputProps={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(null, "amount"),
            value: inputs.amount.value,
        }} />
        <Input label="Date"
          isInvalid={inputs.date.isInvalid}
          // onErrorText="Please enter a date between 2000-01-01 and 2029-12-31 following template YYYY-MM-DD"
          textInputProps={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(null, "date"),
            value: inputs.date.value,
        }} />
      </View>
      <Input
        label="Description"
        isInvalid={inputs.description.isInvalid}
        // onErrorText="Please enter a description containing under 4000 characters"
        textInputProps={{
        multiline: true,
        value: inputs.description.value,
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
  errorText: {
    color: GlobalStyles.colors.error500,
    margin: 8,
  }
});




