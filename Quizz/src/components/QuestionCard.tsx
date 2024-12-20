import { Text, View, StyleSheet } from "react-native";
import AnswerOption from "./AnswerOption";
import { Question } from "../types";
import { useState } from "react";
import Card from "./Card";
type QuestionString = {
  question: Question;
};
export default function QuestionCard({ question }: QuestionString) {
  const [selectedOption, setSelectedOption] = useState("");
  const onPress = (option: string) => {
    // selectedOption = option;
    setSelectedOption((prev) => (prev !== option ? option : ""));
  };

  return question ? (
    <Card title={question.title}>
      <View style={styles.questions}>
        {question.options.map((option, idx) => (
          <AnswerOption
            key={idx}
            option={option}
            onPress={() => onPress(option)}
            isSelected={option === selectedOption}
          />
        ))}
      </View>
    </Card>
  ) : (
    <Card title="No question" />
  );
}

export const styles = StyleSheet.create({
  questions: {
    gap: 10,
  },
});
