import https from "./config"
import { ProductDetail } from "@types"
const productDetail:ProductDetail = {
    create: data => https.post("/product-detail/create", data),
    update: (id, data) => https.patch(`/product-detail/update/${id}`, data),
    delete: id => https.delete(`product-detail/delete/${id}`)
    }
export default productDetail