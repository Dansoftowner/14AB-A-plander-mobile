import apiClient from "./client";

const login = (associationId, user, password) => apiClient.post("/auth", { associationId, user, password });

export default {
    login
}