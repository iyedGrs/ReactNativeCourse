import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
function Image() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: id.toString() }} />
      <Text style={styles.title}>{id}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
});

export default Image;
