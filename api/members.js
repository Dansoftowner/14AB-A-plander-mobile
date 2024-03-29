import storage from '../auth/storage'
import apiClient from './client'

const getMe = (memberId) =>
  apiClient.get(`/members/${memberId}`).then((res) => res)

const getMembers = (q) => apiClient.get('/members', { q: q })

const getPreferences = () => apiClient.get('/members/me/preferences').then(res => res)
const patchPreferences = (data) => apiClient.patch('/members/me/preferences', data)

const patchMe = (name, address, idNumber, phoneNumber, guardNumber) =>
  apiClient
    .patch(`/members/me`, { name, address, idNumber, phoneNumber, guardNumber })
    .then((res) => res)

const patchMeCredentials = (email, username, password, currentPassword) =>
  apiClient
    .patch(
      `/members/me/credentials`,
      { email, username, password },
      { headers: { 'x-current-pass': currentPassword } },
    )
    .catch((err) => err)

export default {
  getMe,
  getMembers,
  getPreferences,
  patchMe,
  patchMeCredentials,
  patchPreferences
}
