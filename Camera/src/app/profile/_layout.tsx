import { Slot } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileLayout = () => {
  return (
    <View style={styles.container}>
      <Text>Profile Header is here</Text>
      <Slot />
      <Text>Profile footer is here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    alignItems: "center",
    backgroundColor: "green",
  },
});

export default ProfileLayout;
