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