import storage from '../auth/storage'
import i18n from '../locales/i18n'
import apiClient from './client'

//const associations = await apiClient.get("/associations", { headers: { "x-auth-token": token } });
const token = storage.getToken()
const getMe = (memberId) =>
  apiClient.get(`/members/${memberId}`).then(res => res)

  const patchMe = (name, address, idNumber, phoneNumber, guardNumber) => apiClient.patch(`/members/me`, {name, address, idNumber, phoneNumber, guardNumber}).then(res => res)

  const patchMeCredentials = (email, username, password, currentPassword) =>
    apiClient.patch(`/members/me/credentials`, {email, username, password}, {headers: {"x-current-pass": currentPassword}}).catch(err => err)
    //console.log(currentPassword)

export default {
  getMe,
  patchMe,
  patchMeCredentials
}
