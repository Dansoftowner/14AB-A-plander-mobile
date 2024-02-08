import i18n from "../locales/i18n";
import apiClient from "./client";

const login = (associationId, user, password) => apiClient.post("/auth", { associationId, user, password }, {headers: {"Accept-Language": i18n.locale}});

export default {
    login
}