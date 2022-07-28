import {Pressable, StyleSheet, Text, View, ViewStyle} from "react-native";
import {GlobalStyles} from "../../constants/styles";

type propsType = {
  children: any
  onPress: () => any
  mode?: 'flat' | 'normal'
  style?: ViewStyle
}

function CustomButton({children, onPress, mode = 'normal', style = {}}: propsType) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 10,
  },
})