import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  let name = "Ramses";

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    color: "red",
  },
});
