import https from "./config"
import { Admin } from "@types"
const admin:Admin = {
    get_by_id: id => https.get(`admin/${id}`,),
    create: data => https.post("/admin/create", data),
    update: (id, data) => https.patch(`/admin/update/${id}`, data),
    delete: id => https.delete(`admin/${id}`),
    }
export default admin