import i18n from "../locales/i18n";
import apiClient from "./client";

// const token = getToken();

//const associations = await apiClient.get("/associations", { headers: { "x-auth-token": token } });
const getAssociations = (q) => apiClient.get("/associations", {q:  q}, {headers: {"Accept-Language": i18n.locale}});

export default {
    getAssociations
}