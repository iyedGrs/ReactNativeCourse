import { Text, View, StyleSheet } from "react-native";
import AnswerOption from "./AnswerOption";
import { Question } from "../types";
import Card from "./Card";
import { useQuizContext } from "../providers/QuizProvider";

export default function QuestionCard() {
  const { question } = useQuizContext();
  return (
    <Card title={question.title}>
      <View style={styles.questions}>
        {question.options.map((option, idx) => (
          <AnswerOption key={idx} option={option} />
        ))}
      </View>
    </Card>
  );
}

export const styles = StyleSheet.create({
  questions: {
    gap: 10,
  },
});
