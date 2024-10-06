import axios from "axios";
import { getData } from "@token-service";
const https = axios.create({
    baseURL: import.meta.env.VITE_API_KEY
})
https.interceptors.request.use((config)=>{
    const access_token = getData("access_token")
    if (access_token) {
        config.headers["Authorization"] = `Bearer ${access_token}`
    }
    return config
})
export default https