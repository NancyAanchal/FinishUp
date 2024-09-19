import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const StartingPage = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo-nobg.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.description}>
        Organize your tasks, prioritize your goals, and complete them with ease.
      </Text>

      <Text
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: "bold",
          color: "#5e57FF",
        }}
      >
        Welcome to a more productive you
      </Text>

      <Pressable style={styles.button} onPress={() => router.replace("/login")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    width: "90%",
    height: "50%",
  },
  description: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#5e57FF",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default StartingPage;
