import { Text, View, StyleSheet, Pressable } from "react-native";
import { useQuizContext } from "../providers/QuizProvider";

interface AnswerOption {
  option: string;
}
export default function AnswerOption({ option }: AnswerOption) {
  const { selectedOption, setSelectedOption } = useQuizContext();
  const isSelected = selectedOption === option;
  return (
    <Pressable onPress={() => setSelectedOption(option)}>
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
