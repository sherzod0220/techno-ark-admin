import https from "./config"
import { Brand } from "@types"
const brand:Brand = {
    get: (params) => {
        const { search , limit, page } = params;
        const url = `/brand/search${search ? `?search=${search}` : ''}`;
        return https.get(url, {
          params: { limit, page },
        });
    },
    create: data => https.post("/brand/create", data),
    update: (id, data) => https.patch(`/brand/update/${id}`, data),
    delete: id => https.delete(`brand/delete/${id}`),
    get_by_id: (id, params) => https.get(`/brand/category/${id}?limit=${params?.limit}&page=${params?.page}`),
    }
export default brand