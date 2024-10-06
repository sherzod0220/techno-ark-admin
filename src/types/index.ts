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