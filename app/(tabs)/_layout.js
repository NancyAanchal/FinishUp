import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            color: "#5e57FF",
            fontWeight: "bold",
            fontSize: 13,
          },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="tasks" size={34} color="#5e57FF" />
            ) : (
              <FontAwesome name="tasks" size={34} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="calender"
        options={{
          tabBarLabel: "Calender",
          tabBarLabelStyle: {
            color: "#5e57FF",
            fontWeight: "bold",
            fontSize: 13,
          },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="calendar" size={34} color="#5e57FF" />
            ) : (
              <FontAwesome name="calendar" size={34} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            color: "#5e57FF",
            fontWeight: "bold",
            fontSize: 13,
          },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user" size={34} color="#5e57FF" />
            ) : (
              <FontAwesome name="user" size={34} color="black" />
            ),
        }}
      />
    </Tabs>
  );
}
