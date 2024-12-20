import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import QuestionCard from "../components/QuestionCard";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import questions from "../../assets/questions";
export default function QuizzScreen() {
  const question = questions[0];
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          {/* Header */}
          <Text style={styles.header}>Quiz</Text>
          {/* Body */}
          <View>
            <QuestionCard question={question} />
            <Text style={styles.time}>20 sec</Text>
          </View>
          {/* Footer */}
          <Pressable
            onPress={() => {
              Alert.alert("ya maalem");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next</Text>
            <FontAwesome6
              name="arrow-right-long"
              size={16}
              color="white"
              style={styles.buttonIcon}
            />
          </Pressable>
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
  button: {
    backgroundColor: "#008080",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  buttonIcon: {
    position: "absolute",
    right: 20,
  },
});
