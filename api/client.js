import { create } from "apisauce";
import storage from "../auth/storage";
import i18n from "../locales/i18n";

const apiClient = create({
    baseURL: "https://dev-plander-org.koyeb.app/api",
    withCredentials: true,
})

apiClient.addAsyncRequestTransform(async (request) => {
    //const token = storage.getToken()
    //console.log(storage.getToken())
    // if (!token) {
    //     return
    // }
    request.headers["x-plander-auth"] = storage.getToken()
    request.headers["Accept-Language"] = i18n.locale
})

// const get = apiClient.get;


// apiClient.get = async (url, params, axiosConfig) => {
//     const response = await get(url, params, axiosConfig)
//     if (response.ok) {
//         // cache.store(url, response.data)
//         return response;
//     }
//     // const data = await cache.get(url);
//     // return data ? {ok: true, data} : response;
// }

export default apiClient;