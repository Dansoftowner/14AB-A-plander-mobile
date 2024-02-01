import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from '@react-navigation/native';

//import colors from "../config/colors";

function MyButton({ title, onPress, color = "medium_blue" }) {
  const { colors: colorsByTheme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colorsByTheme.Login_buttonBg }]}
      onPress={onPress}
    >
      <Text style={[styles.text, {backgroundColor: colorsByTheme.Login_buttonColor}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MyButton;