import https from "./config"
import { SubCategory } from "@types"
const subCategory:SubCategory = {
    get: (params) => {
        const {parent_category_id, search , limit, page } = params;
        const url = `/sub-category/search/${parent_category_id} ${search ? `?search=${search}` : ''}`;
        return https.get(url, {
          params: {parent_category_id, limit, page },
        });
    },
    create: data => https.post("/sub-category/create", data),
    // get_by_id: (id)=> http.get(`product/${id}`,),
    update: (id, data) => https.patch(`/sub-category/update/${id}`, data),
    delete: id => https.delete(`sub-category/delete/${id}`),
    }
export default subCategory