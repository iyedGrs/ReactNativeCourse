import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface CustomHeaderProps {
  onDelete: () => void;
  onSave: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ onDelete, onSave }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title} onPress={() => router.back()}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <MaterialIcons name="keyboard-return" size={24} color="black" />
          <Text style={{ fontWeight: 600, marginBottom: 5 }}>Home</Text>
        </View>
      </Text>
      <View style={styles.iconsContainer}>
        <Pressable onPress={onDelete} style={styles.iconButton}>
          <MaterialIcons name="delete" size={24} color="crimson" />
        </Pressable>
        <Pressable onPress={onSave} style={styles.iconButton}>
          <MaterialIcons name="save" size={24} color="dimgray" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: "#f8f8f8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    borderColor: "black",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default CustomHeader;
