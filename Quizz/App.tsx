import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import QuizzScreen from "./src/app/QuizzScreen";
import QuizProvider from "./src/providers/QuizProvider";

export default function App() {
  return (
    <>
      <QuizProvider>
        <QuizzScreen />
      </QuizProvider>

      <StatusBar style="auto" />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFEF4",
  },
});
