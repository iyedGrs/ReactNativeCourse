import React from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
function Image() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Image! {id}</Text>
    </View>
  );
}

export default Image;
