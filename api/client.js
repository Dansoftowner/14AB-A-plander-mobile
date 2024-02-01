import { create } from "apisauce";

const apiClient = create({
    baseURL: "https://dev-plander-org.koyeb.app/api"
})

apiClient.addAsyncRequestTransform(async (request) => {
    const token = "tokentobechanged"
    if (!token) {
        return
    }
    request.headers["x-auth-token"] = token;
})

apiClient.get = async (url, params, axiosConfig) => {
    const response = await get(url, params, axiosConfig)
    if (response.ok) {
        // cache.store(url, response.data)
        return response;
    }
    // const data = await cache.get(url);
    // return data ? {ok: true, data} : response;
}

export default apiClient;