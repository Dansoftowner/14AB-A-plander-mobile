import i18n from "../locales/i18n";
import apiClient from "./client";

// const token = getToken();

//const associations = await apiClient.get("/associations", { headers: { "x-auth-token": token } });
const getReport = (id) => apiClient.get(`/assignments/${id}/report`);

export default {
    getReport
}