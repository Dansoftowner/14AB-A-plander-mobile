import i18n from "../locales/i18n";
import apiClient from "./client";


const getAssignments = () => apiClient.get("/assignments");

export default {
    getAssignments
}