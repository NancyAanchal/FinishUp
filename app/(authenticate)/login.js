import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Logo from "../components/Logo";
import FinishUp from "../components/FinishUp";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export default function LoginScreen() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const user = {
      email: email.value,
      password: password.value,
    };

    try {
      const response = await axios.post(
        "https://finishup.onrender.com/login",
        user
      );

      const token = response.data.token;

      await AsyncStorage.setItem("authToken", token);
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      await AsyncStorage.setItem("userId", userId);
      setLoading(false);
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 35,
        paddingVertical: 50,
      }}
    >
      {loading && <ActivityIndicator size="large" color="#5e57FF" />}
      <View style={{ marginTop: 50 }}>
        <Logo />
      </View>
      <Header>Welcome back to</Header>
      <FinishUp />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View
        style={{
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={styles.link}>Forgot password?</Text>
      </View>
      <Button
        mode="contained"
        onPress={handleLogin}
        style={{ marginTop: 24, backgroundColor: "#5e57FF" }}
      >
        <Text>Log In</Text>
      </Button>
      <View style={styles.row}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("/register")}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: "#6699CC",
  },
});
