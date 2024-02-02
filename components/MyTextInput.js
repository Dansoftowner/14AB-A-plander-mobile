import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native';

//import defaultStyles from "../config/styles";
import colors from "../config/colors";
import EyeToShowPassword from "./EyeToShowPassword";

function MyTextInput({title, icon, onPress, isPasswordField = false, passwordVisible = false, width = "100%", ...otherProps }) {
  const { colors: colorsByTheme } = useTheme();

  return (
    <View style={[styles.container, { width }, {borderColor: colorsByTheme.Login_textColor}]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colorsByTheme.Login_textColor}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholder={title}
        placeholderTextColor={colorsByTheme.Login_placeholders}
        style={[styles.text, {color: colorsByTheme.Login_textColor}]}
        {...otherProps}
      />
      {isPasswordField && (
        <EyeToShowPassword style={styles.eye} onPress={onPress} passwordVisible={passwordVisible}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 0.7
    },
    eye: {
      right: 10,
      justifyContent: "flex-end",
      alignSelf: "flex-end",
    },
  icon: {
    marginRight: 10,
  },
  text: {
    //color: colors.white,
    fontWeight: "700",
    flex: 1,
    //width: "300",
    // backgroundColor: "red"
  }
});

export default MyTextInput;
