import apiClient from './client'

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

const getReportPdf = (_id) => apiClient.get(`/assignments/${_id}/report/pdf`, {}, { responseType: 'arraybuffer' })

export default {
  deleteReport,
  getReport,
  getReportPdf,
  patchReport,
  postReport
}
