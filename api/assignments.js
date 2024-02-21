import i18n from '../locales/i18n'
import apiClient from './client'

const getAssignments = () =>
  apiClient.get('/assignments', { projection: 'full' })

const getAssignmentById = (assignmentId) =>
  apiClient.get(`/assignments/${assignmentId}`, { projection: 'full' })

const patchAssignmentById = (
  assignmentId,
  title,
  location,
  start,
  end,
  assignees,
) =>
  apiClient.patch(`/assignments/${assignmentId}`, {
    title,
    location,
    start,
    end,
    assignees,
  })

export default {
  getAssignments,
  getAssignmentById,
  patchAssignmentById
}
