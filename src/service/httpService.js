import axios from "axios";
import config from "../config.json"

axios.defaults.baseURL = config.apiUrl;

export function setCommonHeader(headerName, headerValue) {
    axios.defaults.headers.common[headerName] = headerValue;

};

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
    setCommonHeader,
}

export default httpService;