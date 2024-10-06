import https from "./config"
import { Category } from "@types"
const category:Category = {
    get: (params) => {
        const { search , limit, page } = params;
        const url = `/category/search${search ? `?search=${search}` : ''}`;
        return https.get(url, {
          params: { limit, page },
        });
    },
    create: data => https.post("/category/create", data),
    update: (id, data) => https.patch(`/category/update/${id}`, data),
    delete: id => https.delete(`category/delete/${id}`),
    }
export default category