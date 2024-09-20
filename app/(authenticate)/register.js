import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
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

export default function RegisterScreen() {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });

  const router = useRouter();
  const handleRegister = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    if (username.value === "") {
      setUsername({ ...username, error: "Enter a username" });
      return;
    }

    if (password.value !== confirmPassword.value) {
      setConfirmPassword({
        ...confirmPassword,
        error: "Passwords do not match",
      });
      return;
    }
    const user = {
      name: username.value,
      email: email.value,
      password: password.value,
    };

    axios
      .post("https://finishup.onrender.com/register", user)
      .then((response) => {
        Alert.alert(
          "registration succesfuul",
          "you have been registered succesfully"
        );

        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUsername("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration failed",
          "an error occured during registration"
        );
      });

    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView
      style={{
        fkex: 1,
        paddingHorizontal: 35,
        paddingTop: 10,
        alignItems: "center",
      }}
    >
      <View>
        <Logo />
      </View>
      <Header>Get started with</Header>
      <FinishUp />
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="true"
      />
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
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={handleRegister}
        style={{ marginTop: 14, backgroundColor: "#5e57FF" }}
      >
        <Text>Register</Text>
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 2,
  },
  link: {
    fontWeight: "bold",
    color: "#6699CC",
  },
});
