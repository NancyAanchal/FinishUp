import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
const index = () => {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [PendingTodos, setPendingTodos] = useState([]);
  const [CompletedTodos, setCompletedTodos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [reload, setReload] = useState(false);
  const [dueDate, setDueDate] = useState(moment().format("MMM DD"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const suggestions = [
    {
      id: "0",
      todo: "GO for a walk",
    },
    {
      id: "1",
      todo: "Feed the dog",
    },
    {
      id: "2",
      todo: "Get groceries",
    },
    {
      id: "3",
      todo: "Clean your wardrobe",
    },
    {
      id: "4",
      todo: "Attend the online meeting",
    },
    {
      id: "5",
      todo: "Hangout with friends",
    },
  ];

  const addTodo = async () => {
    try {
      const formattedDueDate = moment(dueDate, "MMM DD").isValid()
        ? moment(dueDate).format("MMM DD")
        : moment().format("MMM DD");

      const todoData = {
        title: todo,
        category: category,
        description: description,
        dueDate: formattedDueDate,
      };
      const userId = await AsyncStorage.getItem("userId");

      axios
        .post(`https://finishup.onrender.com/${userId}/todos`, todoData)
        .then((response) => {})
        .catch((error) => {});
      await getUserTodos();
      setModalVisible(false);
      setReload(true);
      setTodo("");
      setDescription("");
      setCategory("All");
      setDueDate(moment().format("MMM DD"));
    } catch (error) {}
  };

  useEffect(() => {
    getUserTodos();
  }, [reload, isModalVisible]);

  const getUserTodos = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      const response = await axios.get(
        `https://finishup.onrender.com/users/${userId}/todos`
      );

      setTodos(response.data.todos);
      const fetchedTodos = response.data.todos || [];
      const pending = fetchedTodos.filter(
        (todo) => todo.status !== "completed"
      );

      const completed = fetchedTodos.filter(
        (todo) => todo.status === "completed"
      );

      setPendingTodos(pending);
      setCompletedTodos(completed);
      setReload(false);
    } catch (error) {}
  };

  const markTodoCompleted = async (todoId) => {
    try {
      setReload(true);
      const response = await axios.patch(
        `https://finishup.onrender.com/todos/${todoId}/complete`
      );
    } catch (error) {}
  };

  const deleteTodo = async (todoId) => {
    try {
      const response = await axios.delete(
        `https://finishup.onrender.com/todos/${todoId}/delete`
      );
      setReload(true);
    } catch (error) {}
  };

  return (
    <>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Pressable
          onPress={() => {
            setSelectedCategory("All");
          }}
          style={{
            backgroundColor: selectedCategory === "All" ? "#5e57FF" : "white",
            padding: 10,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>All</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSelectedCategory("Work");
          }}
          style={{
            backgroundColor: selectedCategory === "Work" ? "#5e57FF" : "white",
            padding: 10,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>Work</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSelectedCategory("Personal");
          }}
          style={{
            backgroundColor:
              selectedCategory === "Personal" ? "#5e57FF" : "white",
            padding: 10,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>
            Personal
          </Text>
        </Pressable>
        {/* <Pressable
          onPress={() => {
            setSelectedCategory("Wishlist");
          }}
          style={{
            backgroundColor:
              selectedCategory === "Wishlist" ? "#5e57FF" : "white",
            padding: 5,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>
            Wishlist
          </Text>
        </Pressable> */}

        <Pressable>
          <AntDesign
            onPress={() => setModalVisible(!isModalVisible)}
            name="pluscircle"
            size={40}
            color="#4BFF36"
          />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ paddingVertical: 10, paddingHorizontal: 35 }}>
          {todos?.length > 0 ? (
            <View>
              {PendingTodos?.length > 0 && (
                <Text
                  style={{ marginBottom: 10, fontSize: 14, fontWeight: "bold" }}
                >
                  Tasks to Finish Up!
                </Text>
              )}

              {PendingTodos?.map((item, index) => (
                <Pressable
                  onPress={() => {
                    router?.push({
                      pathname: "/home/info",
                      params: {
                        id: item._id,
                        title: item?.title,
                        category: item?.category,
                        description: item?.description,
                        createdAt: item?.createdAt,
                        dueDate: item?.dueDate,
                      },
                    });
                  }}
                  style={{
                    borderRadius: 25,
                    borderWidth: 1,
                    padding: 15,
                    borderRadius: 7,
                    marginVertical: 10,
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
                    <FontAwesome
                      onPress={() => markTodoCompleted(item?._id)}
                      name="circle"
                      size={18}
                      color="#04fae2"
                    />
                    <Text style={{ flex: 1 }}>{item?.title}</Text>
                    <FontAwesome
                      onPress={() => deleteTodo(item?._id)}
                      name="trash"
                      size={18}
                      color="red"
                    />
                  </View>
                </Pressable>
              ))}
              {CompletedTodos?.length > 0 ? (
                <View>
                  {PendingTodos?.length == 0 && (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 10,
                        marginVertical: 30,
                      }}
                    >
                      <Image
                        style={{ width: 160, height: 160 }}
                        source={require("../../../assets/icon.png")}
                      />
                      <Text
                        style={{
                          fontSize: 17,
                          marginTop: 2,
                          marginBottom: 10,
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        All Tasks have been finished up!
                      </Text>
                      <Pressable>
                        <AntDesign
                          onPress={() => setModalVisible(!isModalVisible)}
                          name="pluscircle"
                          size={44}
                          color="#4BFF36"
                        />
                      </Pressable>
                    </View>
                  )}
                  <View>
                    <Pressable
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        marginTop: 10,
                        flex: 1,
                        borderRadius: 6,
                      }}
                      onPress={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                        Finished up todos
                      </Text>
                      {isDropdownOpen ? (
                        <AntDesign name="caretup" size={24} color="black" />
                      ) : (
                        <AntDesign name="caretdown" size={24} color="black" />
                      )}
                    </Pressable>

                    {isDropdownOpen &&
                      CompletedTodos?.map((item, index) => (
                        <Pressable
                          style={{
                            borderRadius: 25,
                            borderWidth: 1,
                            padding: 15,
                            borderRadius: 7,
                            marginVertical: 10,
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
                            <FontAwesome
                              name="check-circle"
                              size={18}
                              color="#4BFF36"
                            />
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
              ) : (
                <Text
                  style={{
                    alignItems: "center",
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  No To-Dos have been Finished up yet
                </Text>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{ width: 150, height: 150, resizeMode: "contain" }}
                source={require("../../../assets/icon.png")}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 2,
                  marginBottom: 10,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No tasks added.
              </Text>
              <Pressable>
                <AntDesign
                  onPress={() => setModalVisible(!isModalVisible)}
                  name="pluscircle"
                  size={50}
                  color="#4BFF36"
                />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={400}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "100", height: 480 }}>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input a new task"
              style={{
                padding: 10,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 8,
                flex: 1,
              }}
            />
            <Ionicons
              onPress={addTodo}
              name="send-sharp"
              size={34}
              color="#5e57FF"
            />
          </View>
          <Text style={{ marginBottom: 3 }}>Description</Text>
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="Describe your To-Do"
            style={{
              padding: 10,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 5,
            }}
          />
          <Pressable
            style={{
              marginTop: 10,
              marginBottom: 10,
              flexDirection: "row",
              gap: 5,
            }}
          >
            <FontAwesome name="calendar" size={34} color="black" />

            <TextInput
              value={dueDate}
              onChangeText={(text) => setDueDate(text)}
            />
          </Pressable>

          <Text style={{ marginTop: 10, marginBottom: 3 }}>
            Choose category
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <Pressable
              onPress={() => setCategory("All")}
              style={{
                borderColor: "black",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
                backgroundColor: category === "All" ? "#5e57FF" : "white",
              }}
            >
              <Text>All</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("Personal")}
              style={{
                borderColor: "black",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
                backgroundColor: category === "Personal" ? "#5e57FF" : "white",
              }}
            >
              <Text>Personal</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("Wishlist")}
              style={{
                borderColor: "black",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
                backgroundColor: category === "Wishlist" ? "#5e57FF" : "white",
              }}
            >
              <Text>Wishlist</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("Work")}
              style={{
                borderColor: "black",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
                backgroundColor: category === "Work" ? "#5e57FF" : "white",
              }}
            >
              <Text>Work</Text>
            </Pressable>
          </View>
          <ScrollView>
            <Text>Some suggestions</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 10,
                marginTop: 3,
              }}
            >
              {suggestions?.map((item, index) => (
                <Pressable
                  onPress={() => setTodo(item?.todo)}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 25,
                    borderWidth: 1,
                  }}
                  key={index}
                >
                  <Text style={{ textAlign: "center" }}>{item?.todo}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
