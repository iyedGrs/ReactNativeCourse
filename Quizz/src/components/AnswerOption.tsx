import { Text, View, StyleSheet, Pressable } from "react-native";

interface AnswerOption {
  option: string;
  onPress: () => void;
  isSelected: boolean;
}

export default function AnswerOption({
  option,
  onPress,
  isSelected,
}: AnswerOption) {
  return (
    <Pressable onPress={onPress}>
      <Text
        style={[
          styles.question,
          isSelected && { backgroundColor: "#4DA1A9", color: "white" },
        ]}
      >
        {option}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  question: {
    borderColor: "gray",
    borderWidth: 2,
    padding: 18,
    borderRadius: 20,
    fontSize: 16,
    fontFamily: "sans-serif",
  },
});
