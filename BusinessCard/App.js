import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  ScrollView,
  Button,
  Linking,
  StyleSheet,
  Platform,
  LogBox,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Project from "./components/ProjectCard";
export default function App() {
  const onContactMe = () => {
    Linking.openURL("mailto:iyedacademy6@gmail.com");
  }; 
  const links = {
    github: "iyedGrs",
    email: "grassi.iyed@etudiant-fst.utm.tn",
    x: "iyed grassi",
  };
  const name = "iyed grassi";
  const getOccupation = () => {
    return "Fullstack developer";
  };
 
  const renderIcon = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {links.github && <FontAwesome6 name="github" size={24} color="black" />}
        {links.email && (
          <FontAwesome6 name="envelope" size={24} color="black" />
        )}
        {links.x && <FontAwesome6 name="x-twitter" size={24} color="black" />}
        <StatusBar style="light" />

        {/* <Feather name="at-sign" size={24} color="black" /> */}
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["bottom"]}>
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={{
                uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/0.jpeg",
              }}
              style={{ width: "100%", aspectRatio: 16 / 9 }}
            />
            <Image source={require("./assets/iyed.jpg")} style={styles.image} />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
            <Text style={{ fontSize: 16, color: "gray" }}>
              {getOccupation()}
            </Text>
            {renderIcon()}
            <Button title="contact me " onPress={onContactMe} />
            <Text
              style={{
                padding: 10,
                fontSize: 16,
                lineHeight: 22,
              }}
            >
              iyed ipsum dolor sit amet consectetur adipisicing elit. Distinctio
              iusto tempore autem ipsa dignissimos fuga vero eos vel saepe
              asperiores accusamus, ea, rem, atque suscipit.
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 20 }}>
              Projects{" "}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10, padding: 10 }}
            >
              <Project
                name="Apple Cards"
                image={require("./assets/projects/project1.jpeg")}
              />
              <Project
                name="Trello"
                image={require("./assets/projects/project2.jpeg")}
              />
              <Project
                name="Flappy Bird"
                image={require("./assets/projects/project3.jpeg")}
              />
              <Project
                name="Todo App"
                image={require("./assets/projects/project4.jpeg")}
              />
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    borderColor: "white",
    borderWidth: 5,
    marginTop: -70,
  },
});
