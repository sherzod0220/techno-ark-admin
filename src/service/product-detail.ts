import https from "./config"
import { productDetail } from "@types"
const productDetail:productDetail = {
    create: data => https.post("/product-detail/create", data),
    update: (id, data) => https.patch(`/product-detail/update/${id}`, data),
    delete: id => https.delete(`product-detail/delete/${id}`)
    }
export default productDetail