import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import * as FileSystem from "expo-file-system";
import CustomHeader from "../../../components/CustomHeader";
import { getMediaType } from "../../../utils/MediaTypes";
import { VideoView, useVideoPlayer } from "expo-video";
import * as MediaLibrary from "expo-media-library";
const ImageScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const fullUri = (FileSystem.documentDirectory || "") + (id || "");
  const type = getMediaType(fullUri);
  const [perimissionResponse, requestPermission] =
    MediaLibrary.usePermissions();
  const player = useVideoPlayer(fullUri, (player) => {
    player.loop = true;
    player.play();
  });
  const onDelete = async () => {
    try {
      await FileSystem.deleteAsync(fullUri);
      router.back();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const onSave = async () => {
    if (perimissionResponse?.status !== "granted") {
      await requestPermission();
    }
    const asset = await MediaLibrary.createAssetAsync(fullUri);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <CustomHeader onDelete={onDelete} onSave={onSave} />
      {type === "video" && (
        <>
          {/* <Video
            source={{ uri: fullUri }}
            style={[{ aspectRatio: 3 / 4, borderRadius: 5 }, styles.image]}
            resizeMode={ResizeMode.COVER}
            useNativeControls
          /> */}
          <VideoView
            player={player}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        </>
      )}
      {type === "image" && (
        <Image
          source={{ uri: fullUri }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1, // Ensures the image takes all available space
    // alignSelf: "center", // Centers the image horizontally
    width: "100%", // Prevents horizontal clipping
    transform: [{ scaleX: -1 }], // Flips the image horizontally
  },
});

export default ImageScreen;
