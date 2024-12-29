import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

interface Media {
  name: string;
  uri: string;
}
export default function HomeScreen() {
  const [images, setImages] = useState<Media[]>([]);
  const loadFiles = async () => {
    if (!FileSystem.documentDirectory) {
      return;
    }
    const res = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );
    const imageFiles = res.filter(
      (file) =>
        file.toLowerCase().endsWith(".jpg") ||
        file.toLowerCase().endsWith(".png") ||
        file.toLowerCase().endsWith(".jpeg") ||
        file.toLowerCase().endsWith(".mp4")
    );
    setImages(
      imageFiles.map((file) => ({
        name: file,
        uri: FileSystem.documentDirectory + file,
      }))
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, [])
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={3}
        contentContainerStyle={{ gap: 2 }}
        columnWrapperStyle={{ gap: 2 }}
        renderItem={({ item }) => (
          <Link href={`/image/${item.name}`} asChild>
            <Pressable style={{ flex: 1, maxWidth: "33.33%" }}>
              <Image
                source={{ uri: item.uri }}
                style={{ aspectRatio: 3 / 4, borderRadius: 5 }}
              />
            </Pressable>
          </Link>
        )}
      />
      <Link href="/camera" asChild>
        <Pressable style={styles.floatingBtn}>
          <MaterialIcons name="linked-camera" size={34} color="white" />
        </Pressable>
      </Link>

      <StatusBar barStyle={"light-content"} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
