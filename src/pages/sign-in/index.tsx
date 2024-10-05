import { useState } from "react"
import {auth} from "@service"

const Index = () => {
    const [phone_number,setPhoneNumber] = useState("")
    const [password,setPassword] = useState("")
    const save = () => {
        const payload = {phone_number,password}
        auth.sign_in(payload)
    }
  return (
    <div>
            <input type="text" onChange={(e)=>setPhoneNumber(e.target.value)} className="bg-sky-100 border-[blue] border-[2px]"/>
            <input type="text" onChange={(e)=>setPassword(e.target.value)} className="bg-sky-100 border-[blue] border-[2px]" />
            <button onClick={save} className="bg-[green]">login</button>
    </div>
  )
}

export default Index
