import React from "react";
import { StyleSheet, Text } from "react-native";
const TimerDisplay = ({ time }: { time: number }) => {
  return <Text style={styles.time}>{time} sec</Text>;
};

const styles = StyleSheet.create({
  time: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#008080",
    marginTop: 10,
  },
});

export default TimerDisplay;
