import https from "./config"
import { Stock } from "@types"
const stock:Stock = {
    get: (params) => {
        const { limit, page } = params;
        const url = `/stock`;
        return https.get(url, {
          params: { limit, page },
        });
    },
    create: data => https.post("/stock/create", data),
    update: (id, data) => https.patch(`/stock/update/${id}`, data),
    delete: id => https.delete(`stock/delete/${id}`),
    }
export default stock