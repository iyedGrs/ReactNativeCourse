import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import * as FileSystem from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";
function ImageScreen() {
  const { id } = useLocalSearchParams();
  const fullUri = (FileSystem.documentDirectory || "") + (id || "");
  console.log("the full uri is ", fullUri);

  const onDelete = async () => {
    console.log("deleteing right now");
    await FileSystem.deleteAsync(fullUri);
    router.back();
  };

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Media",
          headerRight: () => (
            <Pressable>
              <MaterialIcons
                onPress={onDelete}
                name="delete"
                size={24}
                color="crimson"
                // style={{ backgroundColor: "green", padding: 5 }}
              />
              <MaterialIcons
                name="save"
                size={24}
                color="dimgray"
                onPress={() => {
                  console.log("hi");
                }}
              />
            </Pressable>
          ),
        }}
      />

      <Image
        source={{ uri: fullUri }}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}

export default ImageScreen;
