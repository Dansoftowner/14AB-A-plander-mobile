import apiClient from "./client";

// const token = getToken();

//const associations = await apiClient.get("/associations", { headers: { "x-auth-token": token } });
const getAssociations = (q) => apiClient.get("/associations", {q:  q});

export default {
    getAssociations
}