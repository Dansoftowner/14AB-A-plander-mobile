import React from "react";
import { Text } from "react-native";

import defaultStyles from "../config/styles";
import { useTheme } from '@react-navigation/native';


function MyText({ children, textColor = "white", style, ...otherProps }) {
  const { colors: colorsByTheme } = useTheme();

  return (
    <Text style={[defaultStyles.text, 
    {color: textColor === "white" ? colorsByTheme.Login_textColor : colorsByTheme.black_white}
    , style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default MyText;
