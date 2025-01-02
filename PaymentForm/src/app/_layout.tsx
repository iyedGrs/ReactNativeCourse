import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";
const RootLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default RootLayout;
