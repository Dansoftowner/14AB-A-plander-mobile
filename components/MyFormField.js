import React from "react";
import { useFormikContext } from "formik";
import { useTheme } from '@react-navigation/native';

import MyErrorMessage from "./MyErrorMessage";
import MyTextInput from "./MyTextInput";
function MyFormField({ name, width, onPress, isPasswordField = false, passwordVisible = false, ...otherProps }) {
  const {
    setFieldTouched,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormikContext();

  return (
    <>
      <MyTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        onPress={onPress}
        isPasswordField={isPasswordField}
        passwordVisible={passwordVisible}
        {...otherProps}
      />
      <MyErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default MyFormField;
