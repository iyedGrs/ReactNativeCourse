import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import QuizzScreen from "./src/app/QuizzScreen";
export default function App() {
  return (
    <View style={styles.container}>
      <QuizzScreen />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFEF4",
  },
});
