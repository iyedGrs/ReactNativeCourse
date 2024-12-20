import { Image, Text, View, StyleSheet } from "react-native";
export default function Project({ name, image }) {
  return (
    <View>
      <Image style={styles.image} source={image} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "dimgray",
    marginTop: 10,
    textAlign: "center",
  },
  image: { height: 150, aspectRatio: 16 / 9, borderRadius: 10 },
});
