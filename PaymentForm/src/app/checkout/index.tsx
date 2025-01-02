import { Redirect } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Index = () => {
  return <Redirect href={"/checkout/personal"} />;
};

export default Index;
