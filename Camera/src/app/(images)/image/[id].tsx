import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import * as FileSystem from "expo-file-system";
import CustomHeader from "../../../components/CustomHeader";

const ImageScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const fullUri = (FileSystem.documentDirectory || "") + (id || "");

  const onDelete = async () => {
    console.log("Deleting right now");
    try {
      await FileSystem.deleteAsync(fullUri);
      router.back();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const onSave = () => {
    console.log("Save pressed");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <CustomHeader onDelete={onDelete} onSave={onSave} />
      <Image
        source={{ uri: fullUri }}
        style={styles.image}
        resizeMode="center"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1, // Ensures the image takes all available space
    alignSelf: "center", // Centers the image horizontally
    width: "100%", // Prevents horizontal clipping
  },
});

export default ImageScreen;
