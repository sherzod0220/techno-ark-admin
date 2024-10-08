import https from "./config"
import { Products } from "@types"
const products:Products = {
    get: (params) => {
        const { search , limit, page } = params;
        const url = `/products/search${search ? `?search=${search}` : ''}`;
        return https.get(url, {
          params: { limit, page },
        });
    },
    create: data => https.post("/products/create", data),
    update: (id, data) => https.patch(`/products/update/${id}`, data),
    delete: id => https.delete(`products/delete/${id}`),
    get_by_id: id => https.get(`products/${id}`,),
    get_product_by_id: (id, params) => https.get(`/products/brand/${id}?limit=${params?.limit}&page=${params?.page}`),

    }
export default products