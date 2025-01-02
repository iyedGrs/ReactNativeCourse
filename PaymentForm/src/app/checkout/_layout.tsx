import { Stack } from "expo-router";
import React from "react";
import CheckoutFormProvider from "../../provider/CheckoutFormProvider";
import { View } from "react-native";
import CheckoutFormStepIndicator from "../../components/CheckoutFormStepIndicator";
const CheckoutLayout = () => {
  return (
    <CheckoutFormProvider>
      <CheckoutFormStepIndicator />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="personal" options={{ title: "Personal" }} />
        <Stack.Screen name="payment" options={{ title: "Payment" }} />
        <Stack.Screen name="confirm" options={{ title: "Confirm" }} />
      </Stack>
    </CheckoutFormProvider>
  );
};

export default CheckoutLayout;
