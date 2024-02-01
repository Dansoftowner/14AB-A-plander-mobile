import React from "react";
import { Text } from "react-native";

import defaultStyles from "../config/styles";
import { useTheme } from '@react-navigation/native';


function MyText({ children, style, ...otherProps }) {
  const { colors: colorsByTheme } = useTheme();

  return (
    <Text style={[defaultStyles.text, {color: colorsByTheme.Login_textColor}, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default MyText;
