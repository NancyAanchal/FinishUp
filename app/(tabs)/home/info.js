import { Pressable, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { useRouter } from "expo-router";
import axios from "axios";

const info = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [description, setDescription] = useState(params?.description);
  const [title, setTitle] = useState(params?.title);
  const [dueDate, setDueDate] = useState(
    moment(params?.dueDate).format("MMM DD")
  );

  const editTodo = async (updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/todos/${params.id}/update`,
        updatedData
      );
    } catch (error) {
      // console.error("Error updating todo:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <AntDesign
        onPress={() => {
          router.push("/home");
        }}
        name="back"
        size={28}
        color="black"
      />

      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "500" }}>Category</Text>

        <View
          style={{
            alignItems: "center",
            backgroundColor: "#04fae2",
            borderRadius: 6,
            padding: 5,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {params?.category}
          </Text>
        </View>
      </View>

      <View style={{}}>
        <Text style={{ marginTop: 8, marginBottom: 3, fontWeight: "500" }}>
          To-do:
        </Text>
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Title for your to-do"
          style={{
            fontWeight: "bold",
            flex: 1,
          }}
          multiline={true}
          onBlur={() => {
            editTodo({ title: title });
          }}
        />
      </View>

      <Text style={{ marginTop: 8, marginBottom: 3, fontWeight: "500" }}>
        Description
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 5,
          padding: 5,
        }}
      >
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Describe your To-Do"
          style={{
            padding: 10,

            flex: 1,
          }}
          multiline={true}
          onBlur={() => {
            editTodo({ description: description });
          }}
        />
      </View>

      <View style={{ marginTop: 40 }}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
        >
          <AntDesign name="plus" size={24} color="#5e57FF" />
          <Text style={{ color: "#5e57FF", fontSize: 16, fontWeight: "400" }}>
            {" "}
            Add a subtask
          </Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 6 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Entypo name="calendar" size={22} color="black" />{" "}
            <Text>Due date</Text>
          </View>

          <TextInput
            value={dueDate}
            onChangeText={(text) => setDueDate(text)}
            onBlur={() =>
              editTodo({
                dueDate: moment(dueDate, "MMM DD").isValid()
                  ? moment(dueDate).format("MMM DD") // Ensure it's in the desired format
                  : moment().format("MMM DD"),
              })
            }
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#04fae2",
              padding: 5,
              borderRadius: 6,
              maxWidth: 55,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default info;
