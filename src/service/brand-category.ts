import https from "./config"
import { BrandCategory } from "@types"
const brand:BrandCategory = {
    get: (params) => {
        const { search , limit, page } = params;
        const url = `/brand-category/search${search ? `?search=${search}` : ''}`;
        return https.get(url, {
          params: { limit, page },
        });
    },
    create: data => https.post("/brand-category/create", data),
    update: (id, data) => https.patch(`/brand-category/update/${id}`, data),
    delete: id => https.delete(`brand-category/delete/${id}`),
    get_by_id: (id, params) => https.get(`/brand-category/brand/${id}?limit=${params?.limit}&page=${params?.page}`),
}
export default brand