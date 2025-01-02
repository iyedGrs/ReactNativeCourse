import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";

const PaymentDetails = () => {
  const onNext = () => {
    // Navigate to the next screen
    router.push("/checkout/confirm");
  };
  return (
    <View style={styles.container}>
      <Text>payment Details</Text>
      <CustomButton title="Next" onPress={onNext} style={styles.button} />
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

export default PaymentDetails;
