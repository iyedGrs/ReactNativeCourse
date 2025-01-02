import React, { ComponentProps } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useController } from "react-hook-form";
type CustomInput = {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  name: string;
} & ComponentProps<typeof TextInput>;
interface ErrorType {
  message: string;
}
const CustomTextInput = ({ label, name, ...textProps }: CustomInput) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name });
  //   const error: ErrorType | undefined = undefined;
  return (
    <View style={[styles.container, textProps.containerStyle]}>
      {label && <Text>{label}</Text>}
      <TextInput
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        {...textProps}
        style={[styles.input, textProps.style, error ? styles.errorInput : {}]}
      />
      <Text style={styles.error} numberOfLines={1}>
        {error?.message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "grey",
    marginTop: 5,
  },
  error: {
    color: "red",
  },
  errorInput: {
    borderColor: "red",
  },
});

export default CustomTextInput;
