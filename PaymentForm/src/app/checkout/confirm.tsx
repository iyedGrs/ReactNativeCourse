import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";

const ConfirmForm = () => {
  const onNext = () => {
    // Navigate to the next screen
    router.dismissAll(); // remover the unsused screen from the stack
    router.back();
  };
  return (
    <View style={styles.container}>
      <Text>confirm form </Text>
      <CustomButton title="Submit" onPress={onNext} style={styles.button} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
  },
  button: { marginTop: "auto", marginBottom: 20 },
});

export default ConfirmForm;
