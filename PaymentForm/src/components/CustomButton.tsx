import React, { ComponentProps, forwardRef, ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";

type CustomButton = {
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  title: string;
  style?: StyleProp<ViewStyle>;
} & ComponentProps<typeof Pressable>;

const CustomButton = forwardRef<View, CustomButton>(
  ({ rightIcon, title, style, ...pressableProps }, ref) => {
    return (
      <Pressable style={[style, styles.button]} {...pressableProps} ref={ref}>
        <Text style={styles.buttonText}>{title}</Text>
        <View style={styles.rightIconContainer}>{rightIcon}</View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#005055",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  rightIconContainer: {
    position: "absolute",
    right: 20,
  },
});

export default CustomButton;
