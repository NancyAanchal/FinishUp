import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const today = moment().format("YYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchCompletedTodos();
  }, [selectedDate]);

  const fetchCompletedTodos = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      const response = await axios.get(
        `https://finishup.onrender.com/${userId}/todos/completed/${selectedDate}`
      );
      const completedTodos = response.data.completedTodos || [];
      setTodos(completedTodos);
    } catch (error) {
      // console.error(error);
    }
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        style={{
          borderRadius: 5,
          margin: 12,
          elevation: 5,
        }}
        theme={{
          calendarBackground: "white",
          dayTextColor: "black",
          textDisabledColor: "white",
          monthTextColor: "#5e57FF",
          textMonthFontWeight: "bold",
          todayTextColor: "#5e57FF",
          todayBackgroundColor: "#04fae2",
          arrowColor: "#5e57FF",
        }}
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#5e57FF" },
        }}
      />
      <View style={{ marginTop: 1, marginHorizontal: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginVertical: 12,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Finished up todos</Text>
          <AntDesign name="caretdown" size={14} color="black" />
        </View>
        {todos?.map((item, index) => (
          <Pressable
            style={{
              borderRadius: 25,
              borderWidth: 1,
              padding: 15,
              borderRadius: 7,
              marginVertical: 5,
            }}
            key={index}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <FontAwesome name="check-circle" size={18} color="#4BFF36" />
              <Text
                style={{
                  flex: 1,
                  textDecorationLine: "line-through",
                  color: "Sgray",
                }}
              >
                {item?.title}
              </Text>
              <FontAwesome
                onPress={() => deleteTodo(item?._id)}
                name="trash"
                size={18}
                color="red"
              />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
