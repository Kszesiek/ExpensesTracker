import {StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import CustomButton from "./CustomButton";

type props = {
  message: string,
  onConfirm: () => any,
  buttonText?: string,
}

function ErrorOverlay ({message, onConfirm, buttonText = 'Okay'}: props) {
  return <View style={styles.container}>
    <Text style={[styles.text, styles.title]}>An error occured</Text>
    <Text style={styles.text}>{message}</Text>
    <CustomButton style={styles.button} onPress={onConfirm}>{buttonText}</CustomButton>
  </View>
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
  },
})