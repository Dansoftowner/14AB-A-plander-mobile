import apiClient from "./client";
import {getToken} from "../auth/storage";

const token = getToken();

//const associations = await apiClient.get("/associations", { headers: { "x-auth-token": token } });
const getAssociations = await apiClient.get("/associations");

export default getAssociations;