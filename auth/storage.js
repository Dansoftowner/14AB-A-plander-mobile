import * as SecureStore from "expo-secure-store";

const key = "authToken";
const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
    //console.log(authToken)
  } catch (error) {
    console.log("Error storing the auth token");
  }
};

const getToken = () => {
  console.log(SecureStore.getItem(key))
  return SecureStore.getItem(key);
  // return token;
}

const removeToken = async () => {
  try {
    return await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('Error removing the auth token', error);
  }
}

export default { removeToken, storeToken, getToken };