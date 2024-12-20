import React from "react";
import { View, StyleSheet, Pressable, Alert, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ComponentProps } from "react";

type CustomButtonProps = {
  title: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
} & ComponentProps<typeof Pressable>;

const CustomButton = ({
  title,
  rightIcon,
  ...pressableRest
}: CustomButtonProps) => {
  return (
    <Pressable style={styles.button} {...pressableRest}>
      <Text style={styles.buttonText}>{title}</Text>
      <View style={styles.buttonIcon}>{rightIcon}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#008080",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  buttonIcon: {
    position: "absolute",
    right: 20,
  },
});

export default CustomButton;
