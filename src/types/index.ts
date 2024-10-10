// ======== GLOBAL ========

interface IParams {
    id?: string,
    parent_category_id?: string,
    limit: number,
    page: number,
    search?: string,
}

// ========= Auth =========

interface SignIn {
    phone_number: string;
    password: string;
}

interface SignUp extends SignIn {
    first_name: string;
    last_name: string;
    email: string;
}

export interface Auth {
    sign_in: (data:SignIn)=> any
    sign_up: (data:SignUp)=> any
}


// ========= Category =========
interface CreateData {
    name: any | string
    brand_id?: any | number
}

export interface Category {
    get: (params: IParams)=> any
    create: (data:CreateData) => Promise<any>;
    update: (id: string | number, data: any) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
}


// ====== SubCategory =======

interface ISubCreate {
    parent_category_id: number,
    name: string
}
export interface SubCategory {
    get: (params: IParams) => any
    create: (data:ISubCreate) => Promise<any>;
    update: (id: string | number, data: any) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
}


// ========= Brand =========
interface UpdateBrand {
    name?: any |string,
    categoryId: number | any,
    description: any | string
}

export interface Brand {
    get: (params: IParams)=> any
    create: (data:CreateData) => Promise<any>;
    update: (id: string | number, data: UpdateBrand) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
    get_by_id: ( id:number,params: IParams)=>any
}

// ====== BrandCategory ======
export interface BrandCategory {
    get: (params: IParams)=> any
    create: (data:CreateData) => Promise<any>;
    update: (id: string | number, data: any) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
    get_by_id: ( id:number,params: IParams)=>any
}

// ====== Products ======
interface IProductUpdate {
    name: string,
    price: number,
    category_id: number,
    brand_category_id: number,
    brand_id: number
}

export interface Products {
    get: (params: IParams)=> any
    create: (data:CreateData) => Promise<any>;
    update: (id: number | any | string, data: IProductUpdate) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
    get_by_id: (id:string | number) => Promise<any>;
    get_product_by_id: ( id:number,params: IParams)=>any
}

// ====== Products Details======
interface IDetailCreate {
    quantity: number;
    colors: any | string;
    description: any | string;
    discount: number;
    product_id: number
}

export interface ProductDetail {
    // get: (params: IParams)=> any
    create: (data:IDetailCreate) => Promise<any>;
    update: (id: string | number, data: IDetailCreate) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
}

// ========= Stock =========
interface StockCreate {
    brand_id?: any | number
    category_id: number
    quantity: number
    product_id: number
}

export interface Stock {
    get: (params: IParams)=> any
    create: (data:StockCreate) => Promise<any>;
    update: (id: string | number, data: StockCreate) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
}

// ========== admin ============

export interface Admin {
    get_by_id: ( id:number)=>any
    create: (data:CreateData) => Promise<any>;
    update: (id: string | number, data: any) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
}

// ========= ADS =========
// interface GetAds {
//     name?: any | string
// }
interface CreateAds {
    position: number | any
}
export interface Ads {
    get: ()=> any
    create: (data:CreateAds) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
}