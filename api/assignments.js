import i18n from "../locales/i18n";
import apiClient from "./client";


const getAssignments = () => apiClient.get("/assignments");

const getAssignmentById = (assignmentId) => apiClient.get(`/assignments/${assignmentId}`, {projection: 'full'})

export default {
    getAssignments,
    getAssignmentById
}