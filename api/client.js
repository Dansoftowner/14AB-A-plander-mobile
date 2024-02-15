import { create } from "apisauce";
import storage from "../auth/storage";
import i18n from "../locales/i18n";

const apiClient = create({
    baseURL: "https://dev-plander-org.koyeb.app/api",
    withCredentials: true,
})

apiClient.addAsyncRequestTransform(async (request) => {
    request.headers["x-plander-auth"] = storage.getToken()
    request.headers["Accept-Language"] = i18n.locale
})

export default apiClient;