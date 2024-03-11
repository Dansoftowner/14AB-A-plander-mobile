import apiClient from "./client";

const getAssociations = (q) => apiClient.get("/associations", {q:  q});

export default {
    getAssociations
}