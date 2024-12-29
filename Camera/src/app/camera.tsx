import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Button,
  PermissionsAndroid,
} from "react-native";
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
  Camera,
  PermissionResponse,
} from "expo-camera";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  State,
  GestureHandlerStateChangeEvent,
  Pressable,
} from "react-native-gesture-handler";
import path from "path";
import * as FileSystem from "expo-file-system";
function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();
  const [micPermission, setMicPermission] = useState<PermissionResponse>();
  const [isRecording, setIsRecording] = useState(false);

  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const camera = useRef<CameraView>(null);

  async function requestRecordAudioPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Audio Permission",
        message: "App needs audio permission to record video",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  useEffect(() => {
    if (permission && !permission?.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);
  useEffect(() => {
    (async () => {
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setMicPermission(audioStatus);
    })();
  }, []);
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
  const takeVideo = async () => {
    try {
      if (!camera.current || !micPermission?.granted) {
        console.log("Camera ref or mic permission missing");
        return;
      }

      if (isRecording) {
        setIsRecording(false);
        camera.current.stopRecording();
        return;
      }

      setIsRecording(true);
      const res = await camera.current.recordAsync({ maxDuration: 3 });
      console.log("Video recorded:", res);
    } catch (err) {
      console.log("Video recording error:", err);
    } finally {
      setIsRecording(false);
    }
  };
  const saveFile = async (uri: string) => {
    const fileName = path.parse(uri).base;
    await FileSystem.copyAsync({
      from: uri,
      to: FileSystem.documentDirectory + fileName,
    });
    setPicture(undefined);
    router.back();
  };

  if (picture) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: picture.uri }}
          style={{
            width: "100%",
            flex: 1,
            // transform: [{ scaleX: facing === "front" ? -1 : 1 }],
          }}
        />
        <View>
          <Button title="Save" onPress={() => saveFile(picture.uri)} />
        </View>
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
              mode="video"
            />
          </View>
        </TapGestureHandler>

        <View style={styles.footer}>
          <View />
          <Pressable
            style={[styles.recordButton]}
            onPress={takePicture}
            onLongPress={takeVideo}
          />
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
