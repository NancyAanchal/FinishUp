import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LineChart } from "react-native-chart-kit";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [completedTodos, setCompletedTodos] = useState(0);
  const [pendingTodos, setPendingTodos] = useState(0);
  const router = useRouter();

  const fetchTodoData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const response = await axios.get(
        `https://finishup.onrender.com/${userId}/todos/count`
      );
      const { totalCompletedTodos, totalPendingTodos } = response.data;
      setCompletedTodos(totalCompletedTodos);
      setPendingTodos(totalPendingTodos);
    } catch (error) {
      // console.log("error", error);
    }
  };

  const handleLogout = async () => {
    try {
      // Get the token from AsyncStorage
      const userId = await AsyncStorage.getItem("userId");

      // Call the backend logout endpoint with the token in the Authorization header
      await axios.post(`https://finishup.onrender.com/${userId}/logout`);

      // Clear the JWT token from AsyncStorage
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("authToken");

      // Redirect to the login screen
      router.replace("/login");
    } catch (error) {
      // console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  return (
    <View
      style={{
        padding: 10,
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 25,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <FontAwesome name="user" size={40} color="black" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Keep plans for 15 days
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "gray",
              marginTop: 2,
            }}
          >
            Select a category
          </Text>
        </View>
      </View>

      <View style={{ marginVertical: 20 }}>
        <View style={{ flexDirection: "row", gap: 5, marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Tasks Overview
          </Text>
          <AntDesign name="caretdown" size={20} color="black" />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginVertical: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "#04fae2",
              padding: 10,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
            >
              {completedTodos}
            </Text>
            <Text style={{ marginTop: 4, fontSize: 16 }}>Completed</Text>
          </View>
          <View
            style={{
              backgroundColor: "#04fae2",
              padding: 10,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
            >
              {pendingTodos}
            </Text>
            <Text style={{ marginTop: 4, fontSize: 16 }}>Pending</Text>
          </View>
        </View>
      </View>
      <LineChart
        data={{
          labels: ["Pending", "Completed"],
          datasets: [
            {
              data: [pendingTodos, completedTodos],
            },
          ],
        }}
        width={Dimensions.get("window").width - 20}
        height={220}
        yAxisInterval={2}
        chartConfig={{
          // backgroundColor: "#e26a00",
          backgroundGradientFrom: "#04fae2",
          backgroundGradientTo: "#5e57FF",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
          labelcolor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: "6", strokeWidth: "2", stroke: "#04fae2" },
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
      <View
        style={{
          backgroundColor: "#04fae2",
          padding: 10,
          borderRadius: 6,
          marginTop: 30,
        }}
      >
        <Pressable
          onPress={() => {
            handleLogout();
          }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 18 }}>
            Logout
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Image
          style={{ width: 110, height: 110 }}
          source={require("../../../assets/icon.png")}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
