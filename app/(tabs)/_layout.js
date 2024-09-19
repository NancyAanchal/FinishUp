import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#5e57FF", fontWeight: "bold" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="tasks" size={24} color="#5e57FF" />
            ) : (
              <FontAwesome name="tasks" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="calender"
        options={{
          tabBarLabel: "Calender",
          tabBarLabelStyle: { color: "#5e57FF", fontWeight: "bold" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="calendar" size={24} color="#5e57FF" />
            ) : (
              <FontAwesome name="calendar" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#5e57FF", fontWeight: "bold" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user" size={24} color="#5e57FF" />
            ) : (
              <FontAwesome name="user" size={24} color="black" />
            ),
        }}
      />
    </Tabs>
  );
}
