import React from "react";
import { Image, StyleSheet } from "react-native";

export default function FinishUp() {
  return (
    <Image
      source={require("../../assets/finishup-nobg.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 30,
  },
});
