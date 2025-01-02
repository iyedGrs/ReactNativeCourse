import { useSegments } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const steps = [
  { key: "personal", title: "Personal" },
  { key: "payment", title: "Payment" },
  { key: "confirm", title: "Confirm" },
];

const CheckoutFormStepIndicator = () => {
  const segments = useSegments(); // to get the current stack current active page names
  const currentScreen = segments[segments.length - 1]; // getting the latest screen name
  const stepIndex = steps.findIndex((step) => step.key === currentScreen); // getting the index of the current screen
  return (
    // <SafeAreaProvider style={{ flex: 1 }}>
    <SafeAreaView style={styles.container}>
      {/* <View > */}
      {steps.map((step, index) => (
        <View
          style={[
            styles.viewText,
            stepIndex >= index && { borderColor: "blue" },
          ]}
          key={step.key}
        >
          <Text
            style={[styles.text, stepIndex >= index && { color: "#005055" }]}
            key={step.key}
          >
            {step.title}
          </Text>
        </View>
      ))}

      {/* </View> */}
    </SafeAreaView>
    // </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    height: 110,
    gap: 16,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#9D9D9D",
  },
  viewText: {
    borderBottomWidth: 3,
    borderColor: "black",
    flex: 1,
  },
});

export default CheckoutFormStepIndicator;
