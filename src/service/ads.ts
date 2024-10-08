import https from "./config"
import { Ads } from "@types"
const ads:Ads = {
    get: () => https.get("/ads"),
    create: data => https.post("/ads/create", data),
    delete: id => https.delete(`ads/delete/${id}`),
    }
export default ads