import { View, StyleSheet, Text } from "react-native";
import { PropsWithChildren } from "react";
type CardProps = {
  title: string;
};

export default function Card({
  title,
  children,
}: PropsWithChildren<CardProps>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title} </Text>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    paddingVertical: 40,
    borderRadius: 20,
    gap: 20,
    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.75)",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
  },
});
