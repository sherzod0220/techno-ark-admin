import Cookies from 'js-cookie'

export const saveData =(title: string, value: string)=>{
    Cookies.set(title,value)
}

export const getData = (title:string)=>{
    return Cookies.get(title)
}

export const removeData = (title: string)=>{
    return Cookies.remove(title)
}