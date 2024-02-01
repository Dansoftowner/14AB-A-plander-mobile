import React from "react";
import { useFormikContext } from "formik";

import MyButton from "./MyButton";

function MySubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return <MyButton title={title} onPress={handleSubmit} />;
}

export default MySubmitButton;
