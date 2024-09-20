import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StartingPage = () => {
  const router = useRouter();
  const [pressedButton, setPressedButton] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        setPressedButton(false);
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          console.log(userId);
          await AsyncStorage.setItem("userId", userId);
          router.replace("/home");
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkLoginStatus();
  }, [pressedButton]);

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

      <Pressable
        style={styles.button}
        onPress={() => {
          router.replace("/login");
          setPressedButton(true);
        }}
      >
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
