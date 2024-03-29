import apiClient from './client'

const getAssignments = (start, end) =>
  apiClient.get('/assignments', { projection: 'full', start, end })

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

const deleteAssignment = (assignmentId) => apiClient.delete(`/assignments/${assignmentId}`)

const postAssignment = (title, location, start, end, assignees) => apiClient.post('/assignments', {title, location, start, end, assignees})

export default {
  deleteAssignment,
  getAssignments,
  getAssignmentById,
  patchAssignmentById,
  postAssignment
}
