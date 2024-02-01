import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import colors from "../config/colors";
import EyeToShowPassword from "./EyeToShowPassword";

function PasswordInput({title, icon, passwordVisible, onPress, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.white}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholder={title}
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.text]}
        {...otherProps}
      />
      <EyeToShowPassword style={styles.eye} onPress={onPress} passwordVisible={passwordVisible}/>
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
    borderColor: defaultStyles.colors.white,
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
    color: colors.white,
    fontWeight: "500"
  }
});

export default PasswordInput;
