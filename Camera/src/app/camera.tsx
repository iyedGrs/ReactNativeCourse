import React from "react";
import { Pressable, StatusBar, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Camera!</Text>

      <Link href="/camera" asChild>
        <Pressable style={styles.floatingBtn}>
          <MaterialIcons name="linked-camera" size={34} color="black" />
        </Pressable>
      </Link>
      <StatusBar barStyle={"light-content"} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  floatingBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 50,
  },
});

export default CameraScreen;
