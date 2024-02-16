import * as SecureStore from "expo-secure-store";

const key = "authToken";
const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
    //return console.log(authToken)
  } catch (error) {
    console.log("Error storing the auth token");
  }
};

const getToken = () => {
  return SecureStore.getItem(key)
  // if(token){
  //   return token;
  // }
  // return console.log("nincs tárolt token a kulcshoz")
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