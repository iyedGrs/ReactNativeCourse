import { StyleSheet, Text, View } from "react-native";
import QuestionCard from "../components/QuestionCard";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";

import CustomButton from "../components/CustomButton";
import Card from "../components/Card";
import { useQuizContext } from "../providers/QuizProvider";

export default function QuizzScreen() {
  const { question, onNext, score, totalQuestions, restart } = useQuizContext();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          {/* Header */}
          <Text style={styles.header}>Quiz</Text>
          {/* Body */}

          {question ? (
            <View>
              <QuestionCard />
              <Text style={styles.time}>20 sec</Text>
            </View>
          ) : (
            <Card title="Well Done ">
              <Text>
                Correct answers : {score} / {totalQuestions}
              </Text>
              <Text>Best score is : </Text>
            </Card>
          )}
          {question ? (
            <CustomButton
              onPress={onNext}
              title="Next"
              // disabled={!question}
              rightIcon={
                <FontAwesome6 name="arrow-right" size={16} color="white" />
              }
            />
          ) : (
            <CustomButton
              onPress={restart}
              title="Replay"
              // disabled={!question}
              // rightIcon={
              //   <FontAwesome6 name="arrow-right" size={16} color="white" />
              // }
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: "100%",
    justifyContent: "space-between",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    color: "#008080",
  },
  time: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#008080",
    marginTop: 10,
  },
});
