import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  State,
  GestureHandlerStateChangeEvent,
  Pressable,
} from "react-native-gesture-handler";
function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const camera = useRef<CameraView>(null);
  useEffect(() => {
    if (permission && !permission?.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);
  if (!permission?.granted) {
    return <ActivityIndicator />;
  }
  const cameraToggle = () => {
    setFacing(facing === "front" ? "back" : "front");
  };
  const onDoubleTap = (event: GestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state == State.END) {
      cameraToggle();
    }
  };
  const takePicture = async () => {
    const res = await camera.current?.takePictureAsync();
    setPicture(res);
  };
  if (picture) {
    return (
      <View>
        <Image
          source={{ uri: picture.uri }}
          style={{
            width: "100%",
            height: "100%",
            // transform: [{ scaleX: facing === "front" ? -1 : 1 }],
          }}
        />
        <MaterialIcons
          name="close"
          color={"white"}
          style={styles.close}
          size={30}
          onPress={() => setPicture(undefined)}
        />
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>
        <TapGestureHandler onHandlerStateChange={onDoubleTap} numberOfTaps={2}>
          <View>
            <CameraView
              mirror={facing === "front"}
              ref={camera}
              style={styles.camera}
              facing={facing}
            />
          </View>
        </TapGestureHandler>

        <View style={styles.footer}>
          <View />
          <Pressable style={styles.recordButton} onPress={takePicture} />
          <MaterialIcons
            name="flip-camera-android"
            size={30}
            color="white"
            onPress={cameraToggle}
          />
        </View>

        <MaterialIcons
          name="close"
          color={"white"}
          style={styles.close}
          size={30}
          onPress={() => router.back()}
        />
      </View>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  close: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    zIndex: 1,
    backgroundColor: "#00000099",
  },
  recordButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
  },
});

export default CameraScreen;