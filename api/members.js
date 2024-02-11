import storage from '../auth/storage'
import i18n from '../locales/i18n'
import apiClient from './client'

//const associations = await apiClient.get("/associations", { headers: { "x-auth-token": token } });
const token = storage.getToken()
const getMe = (memberId) =>
  apiClient.get(`/members/${memberId}`, {}, {headers: {"x-plander-auth": token}}).then(res => res)

  const patchMe = (name, address, idNumber, phoneNumber, guardNumber) => apiClient.patch(`/members/me`, {name, address, idNumber, phoneNumber, guardNumber}, {headers: {"x-plander-auth": token}})

  const patchMeCredentials = (email, username, newPwd, user, currentPassword) => {
    
    apiClient.patch(`/members/me/credentials`, {email, username, newPwd}, {headers: {"x-plander-auth": token}, "x-current-pass": currentPassword})
}

export default {
  getMe,
  patchMe
}
