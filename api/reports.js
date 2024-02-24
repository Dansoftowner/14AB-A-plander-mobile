import i18n from '../locales/i18n'
import apiClient from './client'

// const token = getToken();

//const associations = await apiClient.get("/associations", { headers: { "x-auth-token": token } });
const getReport = (id) => apiClient.get(`/assignments/${id}/report`)
const deleteReport = (id) => apiClient.delete(`/assignments/${id}/report`)

const postReport = (
  id,
  method,
  purpose,
  licensePlateNumber,
  startKm,
  endKm,
  externalOrganization,
  externalRepresentative,
  description,
) =>
  apiClient.post(`/assignments/${id}/report`, {
    method,
    purpose,
    licensePlateNumber,
    startKm,
    endKm,
    externalOrganization,
    externalRepresentative,
    description,
  })

const patchReport = (
  id,
  method,
  purpose,
  licensePlateNumber,
  startKm,
  endKm,
  externalOrganization,
  externalRepresentative,
  description,
) =>
  apiClient.patch(`/assignments/${id}/report`, {
    method,
    purpose,
    licensePlateNumber,
    startKm,
    endKm,
    externalOrganization,
    externalRepresentative,
    description,
  })

export default {
  getReport,
  deleteReport,
  postReport,
  patchReport
}
