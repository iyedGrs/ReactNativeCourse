import { Link, Stack } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

const ComponentName = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Home" }} />

      <Link href="/checkout" asChild>
        <CustomButton title="Go to Checkout" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ComponentName;
